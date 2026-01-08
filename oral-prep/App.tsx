import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SessionStatus, Message } from './types';
import { 
  floatTo16BitPCM, 
  arrayBufferToBase64, 
  base64ToUint8Array, 
  pcmToAudioBuffer 
} from './services/audioUtils';
import { Visualizer } from './components/Visualizer';
import { 
  MicrophoneIcon, 
  StopIcon, 
  SpeakerWaveIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';

// Configuration
const GEMINI_MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

const SYSTEM_INSTRUCTION = `
You are "Raven", a friendly and encouraging expert JAMB UTME Oral English Examiner and Pronunciation Coach. Your primary goal is to help Nigerian high school students prepare for the JAMB UTME Oral English exam according to the official syllabus.

**JAMB UTME ORAL ENGLISH FOCUS AREAS:**
1. Vowels (monothongs, diphthongs, triphthongs)
2. Consonants (including clusters)
3. Rhymes (including homophones)
4. Word stress (monosyllabic and polysyllabic)
5. Emphatic stress in connected speech

**EXAMINATION PROTOCOL:**

**Phase 1: Initial Assessment & Warm-up**
1. Welcome the student warmly and briefly explain you'll help them practice for JAMB Oral English.
2. Ask: "Which specific area from the JAMB Oral English syllabus would you like to practice today? (Vowels, Consonants, Rhymes, Word Stress, or Emphatic Stress) - or should we begin with a general assessment?"
3. If uncertain, start with a short diagnostic sentence containing common Nigerian pronunciation challenges.

**Phase 2: Syllabus-Focused Practice**
*For each practice round:*
1. **Present Material:** Give a word, phrase, or sentence targeting the chosen syllabus area.
   - For vowels: Highlight monothongs/diphthongs/triphthongs
   - For consonants: Include challenging clusters
   - For rhymes/homophones: Use word pairs
   - For word stress: Use polysyllabic words
   - For emphatic stress: Provide context-driven sentences

2. **Listen & Analyze:** Carefully evaluate:
   - Accuracy of specific sounds
   - Correct stress placement
   - Natural rhythm in connected speech
   - Common Nigerian English deviations

3. **Provide Feedback:**
   - **If correct:** Praise specifically ("Perfect diphthong in 'coin'!" or "Excellent emphatic stress on 'never'!"). Increase difficulty slightly.
   - **If incorrect:** Gently identify the exact issue ("Let's work on the /θ/ in 'thought' - it's unvoiced"). Model correct pronunciation clearly. Ask for repetition of the specific sound/word before the full sentence.

**Phase 3: Progressive Development**
1. Move from isolated sounds → words → phrases → full sentences → short dialogues.
2. Incorporate common JAMB exam question formats.
3. Occasionally test multiple areas simultaneously (e.g., consonant clusters with word stress).

**GUIDELINES:**
1. Keep your spoken responses concise (15-30 words maximum).
2. Prioritize student speaking time - you're a coach, not a lecturer.
3. Be encouraging but precise in corrections.
4. Reference JAMB syllabus terms when helpful ("Remember, JAMB tests diphthong differentiation").
5. If a student struggles repeatedly with a sound, offer a brief tongue/mouth position tip.
6. Adjust difficulty based on performance.
7. Maintain a supportive, professional tone appropriate for secondary school students.

**STARTING NOW:** Begin with Phase 1. Be enthusiastic and focused on practical JAMB preparation.
`;

const App: React.FC = () => {
  // State
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.DISCONNECTED);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userVolume, setUserVolume] = useState(0);
  const [aiVolume, setAiVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Refs for audio handling (persisting across renders)
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Gemini Session Promise Ref
  // Crucial: We store the connect promise so we can chain off it reliably in callbacks
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const aiClientRef = useRef<GoogleGenAI | null>(null);

  // Transcription accumulation refs
  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');

  // Cleanup function to stop audio and disconnect
  const disconnect = useCallback(() => {
    // 1. Close Microphone Stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // 2. Disconnect Input Audio Processing
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }

    // 3. Stop Output Audio
    audioSourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) { /* ignore */ }
    });
    audioSourcesRef.current.clear();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // 4. Close Gemini Session (Wait for promise if connecting)
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => {
            try {
                session.close();
            } catch(e) {
                console.warn("Error closing session", e);
            }
        });
        sessionPromiseRef.current = null;
    }

    setStatus(SessionStatus.DISCONNECTED);
    setUserVolume(0);
    setAiVolume(0);
    nextStartTimeRef.current = 0;
  }, []);

  const startSession = async () => {
    try {
      setError(null);
      setStatus(SessionStatus.CONNECTING);
      setMessages([]); // Clear previous chat

      // Initialize Google GenAI Client
      // Note: In a real app, you might check window.aistudio for API key selection if needed, 
      // but here we use the process.env as per prompt instructions for standard usage.
      if (!process.env.API_KEY) {
        throw new Error("API Key not found in environment.");
      }
      aiClientRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ 
        sampleRate: INPUT_SAMPLE_RATE 
      });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ 
        sampleRate: OUTPUT_SAMPLE_RATE 
      });

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Connect to Gemini Live
      const ai = aiClientRef.current;
      
      sessionPromiseRef.current = ai.live.connect({
        model: GEMINI_MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }, // Professional sounding voice
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          // Enable transcription so we can show the user what's happening
          // Fixed: Removed invalid 'model' property from transcription config
          inputAudioTranscription: {}, 
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setStatus(SessionStatus.CONNECTED);

            // SETUP INPUT STREAMING (Mic -> Gemini)
            if (!inputAudioContextRef.current || !streamRef.current) return;
            
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);

            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume meter logic
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              setUserVolume(Math.min(1, rms * 5)); // Amplify visually

              // Send to Gemini
              const pcm16 = floatTo16BitPCM(inputData);
              const base64Data = arrayBufferToBase64(pcm16);

              // Use the promise ref to ensure we use the active session
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then(session => {
                  session.sendRealtimeInput({
                    media: {
                      mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
                      data: base64Data
                    }
                  });
                });
              }
            };

            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // 1. Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && audioContextRef.current) {
                const ctx = audioContextRef.current;
                
                // Decode
                const rawBytes = base64ToUint8Array(base64Audio);
                const audioBuffer = await pcmToAudioBuffer(rawBytes, ctx, OUTPUT_SAMPLE_RATE);

                // Schedule Playback
                // Ensure we don't schedule in the past
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                
                // Visualizer hook
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 32;
                source.connect(analyser);
                analyser.connect(ctx.destination);
                
                // Analyze volume for AI visualizer during playback
                // Note: This is a simplification. For precise syncing, we'd use a requestAnimationFrame loop
                // but setting a quick interval attached to the source duration works for simple UI.
                const durationMs = audioBuffer.duration * 1000;
                const intervalId = setInterval(() => {
                    const dataArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    dataArray.forEach(v => sum += v);
                    const avg = sum / dataArray.length;
                    setAiVolume(avg / 255); 
                }, 50);

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                
                audioSourcesRef.current.add(source);

                source.onended = () => {
                    audioSourcesRef.current.delete(source);
                    clearInterval(intervalId);
                    setAiVolume(0);
                };
             }

             // 2. Handle Transcriptions (User & AI)
             if (message.serverContent?.inputTranscription) {
                 currentInputTranscription.current += message.serverContent.inputTranscription.text;
             }
             if (message.serverContent?.outputTranscription) {
                 currentOutputTranscription.current += message.serverContent.outputTranscription.text;
             }

             // 3. Handle Turn Complete (Commit transcripts to state)
             if (message.serverContent?.turnComplete) {
                 if (currentInputTranscription.current) {
                     setMessages(prev => [...prev, {
                         id: Date.now().toString() + '-user',
                         role: 'user',
                         text: currentInputTranscription.current,
                         timestamp: new Date()
                     }]);
                     currentInputTranscription.current = '';
                 }
                 if (currentOutputTranscription.current) {
                     setMessages(prev => [...prev, {
                         id: Date.now().toString() + '-ai',
                         role: 'model',
                         text: currentOutputTranscription.current,
                         timestamp: new Date()
                     }]);
                     currentOutputTranscription.current = '';
                 }
             }

             // 4. Handle Interruption
             if (message.serverContent?.interrupted) {
                 // Stop all currently playing AI audio
                 audioSourcesRef.current.forEach(src => {
                     try { src.stop(); } catch(e) {}
                 });
                 audioSourcesRef.current.clear();
                 nextStartTimeRef.current = audioContextRef.current?.currentTime || 0;
                 currentOutputTranscription.current = ''; // Discard interrupted text
                 setAiVolume(0);
             }
          },
          onerror: (e) => {
            console.error("Gemini Live Error", e);
            setError("Connection error. Please try again.");
            disconnect();
          },
          onclose: (e) => {
            console.log("Gemini Live Closed", e);
            setStatus(SessionStatus.DISCONNECTED);
          }
        }
      });

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to start session");
      setStatus(SessionStatus.ERROR);
    }
  };

  // Scroll to bottom of chat
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px] opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px] opacity-30"></div>
        </div>

      <header className="absolute top-6 left-0 w-full px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <AcademicCapIcon className="w-8 h-8 text-emerald-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">FluentCheck</h1>
        </div>
        <div className="text-sm font-medium text-slate-400 border border-slate-700 px-3 py-1 rounded-full bg-slate-800/50">
           {status === SessionStatus.CONNECTED ? 
            <span className="flex items-center gap-2 text-emerald-400"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>Live Session</span> 
            : 'Ready to Learn'}
        </div>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-8 relative z-10 mt-16">
        
        {/* Main Interaction Area */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-between min-h-[400px]">
            
            {/* Visualizers */}
            <div className="w-full flex items-center justify-around flex-1">
                <div className="flex flex-col items-center gap-4 w-1/2">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                         <AcademicCapIcon className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-blue-200">Coach Raven</p>
                    <Visualizer isActive={status === SessionStatus.CONNECTED} volume={aiVolume} role="model" />
                </div>
                
                <div className="h-32 w-px bg-slate-600/50"></div>

                <div className="flex flex-col items-center gap-4 w-1/2">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                         <SpeakerWaveIcon className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-emerald-200">You</p>
                    <Visualizer isActive={status === SessionStatus.CONNECTED} volume={userVolume} role="user" />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-200 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Controls */}
            <div className="mt-8 flex gap-4">
                {status === SessionStatus.DISCONNECTED || status === SessionStatus.ERROR ? (
                    <button 
                        onClick={startSession}
                        disabled={status === SessionStatus.CONNECTING}
                        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    >
                        {status === SessionStatus.CONNECTING ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <MicrophoneIcon className="w-6 h-6" />
                                <span>Start Oral Exam Prep</span>
                            </>
                        )}
                    </button>
                ) : (
                    <button 
                        onClick={disconnect}
                        className="group flex items-center gap-3 bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                        <StopIcon className="w-6 h-6" />
                        <span>End Session</span>
                    </button>
                )}
            </div>
            
            <p className="mt-6 text-slate-400 text-xs text-center max-w-sm leading-relaxed">
                {status === SessionStatus.CONNECTED 
                 ? "Listen to the coach and repeat the phrases. The AI will correct your pronunciation." 
                 : "Click start to connect with the AI Tutor. Requires microphone access."}
            </p>
        </div>

        {/* Live Transcript Log (Optional but helpful for feedback) */}
        {messages.length > 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-64 flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm uppercase tracking-wider font-semibold">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <h3>Transcript History</h3>
                </div>
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-emerald-900/40 text-emerald-100 border border-emerald-800/50 rounded-br-none' 
                                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default App;