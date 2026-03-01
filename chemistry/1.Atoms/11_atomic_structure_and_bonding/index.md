<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8LYQ579PW8"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-8LYQ579PW8');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.12 Molecular Models | Chemistry</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-deep: #0B0F19;
            --bg-surface: #151B2B;
            --primary: #6366F1;
            --accent: #10B981;
            --text-main: #FFFFFF;
            --text-muted: #94A3B8;
            --border: rgba(255, 255, 255, 0.08);
            --font: 'Plus Jakarta Sans', sans-serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font);
            background-color: var(--bg-deep);
            color: var(--text-main);
            line-height: 1.5;
        }
        .glow-orb {
            position: fixed; width: 400px; height: 400px;
            background: var(--primary); filter: blur(150px); opacity: 0.15;
            border-radius: 50%; z-index: -1;
        }
        .glow-1 { top: -100px; left: -100px; }
        .glow-2 { bottom: -100px; right: -100px; background: var(--accent); }
        header {
            padding: 1.2rem 1.5rem;
            display: flex; justify-content: space-between;
            background: rgba(11,15,25,0.8); backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
        }
        .brand { font-size: 1.3rem; font-weight: 800; display: flex; align-items: center; gap: 8px; }
        .brand span { color: var(--primary); }
        .brand-icon { width: 28px; height: 28px; background: var(--primary); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; }
        .user-pill {
            display: flex; align-items: center; gap: 8px;
            background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 50px; border: 1px solid var(--border);
        }
        .user-avatar { width: 24px; height: 24px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-size: 0.8rem; }
        .container { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
        .back-button {
            display: inline-block;
            margin-bottom: 1.5rem;
            color: var(--text-muted);
            transition: color 0.2s;
            font-size: 0.9rem;
        }
        .back-button:hover { color: var(--primary); }
        .intro-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 1.8rem;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 0.2rem;
            color: var(--primary);
        }
        h2 {
            font-size: 1.4rem;
            margin: 1.8rem 0 1rem;
            color: var(--accent);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        h2::before {
            content: "🧩";
            font-size: 1.3rem;
        }
        h3 {
            font-size: 1.2rem;
            margin: 1.2rem 0 0.5rem;
            color: var(--primary);
        }
        .subtitle {
            color: var(--text-muted);
            font-size: 1rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px dashed var(--border);
            padding-bottom: 1rem;
        }
        .highlight { 
            color: var(--accent); 
            font-weight: 700;
            background: rgba(16,185,129,0.1);
            padding: 0.1rem 0.3rem;
            border-radius: 4px;
        }
        .highlight-blue { 
            color: var(--primary); 
            font-weight: 700;
            background: rgba(99,102,241,0.1);
            padding: 0.1rem 0.3rem;
            border-radius: 4px;
        }
        .footer { 
            margin-top: 2.5rem; 
            text-align: center; 
            color: var(--text-muted); 
            font-size: 0.85rem;
            border-top: 1px solid var(--border);
            padding-top: 1.5rem;
        }
        
        /* Table styles */
        .bond-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: rgba(0,0,0,0.3);
            border-radius: 16px;
            overflow: hidden;
        }
        .bond-table th {
            background: var(--primary);
            color: white;
            padding: 0.8rem;
            font-weight: 600;
        }
        .bond-table td {
            padding: 0.6rem;
            text-align: center;
            border-bottom: 1px solid var(--border);
        }
        .bond-table tr:last-child td {
            border-bottom: none;
        }
        
        .model-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        .model-card {
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 1.2rem;
            text-align: center;
        }
        .model-card .icon {
            font-size: 3rem;
            margin-bottom: 0.5rem;
        }
        .model-card .title {
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .model-card .desc {
            color: var(--text-muted);
            font-size: 0.9rem;
        }
        
        .image-container {
            margin: 1.5rem 0;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--border);
            background: var(--bg-deep);
        }
        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        .image-caption {
            padding: 0.8rem;
            color: var(--text-muted);
            font-size: 0.85rem;
            text-align: center;
            border-top: 1px solid var(--border);
        }
        .info-box {
            background: rgba(16,185,129,0.1);
            border-left: 4px solid var(--accent);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0 8px 8px 0;
            font-size: 0.95rem;
        }
        .fun-fact {
            background: rgba(16,185,129,0.1);
            border-radius: 16px;
            padding: 1rem;
            margin: 1.5rem 0;
            border: 1px dashed var(--accent);
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        .fun-fact .emoji {
            font-size: 2rem;
        }
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--border), transparent);
            margin: 2rem 0;
        }
    </style>
</head>
<body>
    <div class="glow-orb glow-1"></div>
    <div class="glow-orb glow-2"></div>
    <header>
        <div class="brand"><div class="brand-icon">🧩</div><span>Raven</span> Academy</div>
        <div class="user-pill"><span style="font-size:0.8rem;">Student</span><div class="user-avatar">JS</div></div>
    </header>
    <div class="container">
        <a href="../" class="back-button">← Back to Atomic Structure & Bonding</a>
        <div class="intro-card">
            <h1>2.12 Molecular Models</h1>
            <div class="subtitle">Bringing molecules to life in 3D</div>

            <!-- HOOK -->
            <div class="fun-fact">
                <div class="emoji">📐</div>
                <div><strong>Molecules aren't flat!</strong> Those drawings on paper are just shortcuts. Real molecules have shape, size, and volume – and that matters for how they work, especially in your body.</div>
            </div>

            <!-- Recap of shapes -->
            <h2>Quick Recap: Molecular Shapes</h2>
            
            <ul style="margin: 1rem 0 1rem 1.5rem;">
                <li><span class="highlight">Tetrahedral (sp³):</span> 109.5° – like methane (CH₄)</li>
                <li><span class="highlight">Trigonal planar (sp²):</span> 120° – like ethylene (C₂H₄)</li>
                <li><span class="highlight">Linear (sp):</span> 180° – like acetylene (C₂H₂)</li>
            </ul>
            
            <p>These angles aren't random – they're the best way to keep electrons as far apart as possible (minimize repulsion).</p>

            <!-- Bond lengths table -->
            <h2>Typical Bond Lengths (Table 2.3)</h2>
            
            <p>Bond lengths are pretty consistent. Here are the averages (in Ångströms, 1 Å = 10⁻¹⁰ m):</p>
            
            <table class="bond-table">
                <tr>
                    <th>Bond type</th>
                    <th>Example</th>
                    <th>Length (Å)</th>
                </tr>
                <tr><td colspan="3" style="background: var(--primary); color: white;">Single bonds to H</td></tr>
                <tr><td>H–C</td><td>methane</td><td>1.06–1.10</td></tr>
                <tr><td>H–N</td><td>ammonia</td><td>1.01</td></tr>
                <tr><td>H–O</td><td>water</td><td>0.96</td></tr>
                
                <tr><td colspan="3" style="background: var(--primary); color: white;">Single bonds (no H)</td></tr>
                <tr><td>C–C</td><td>ethane</td><td>1.54</td></tr>
                <tr><td>C–N</td><td>methylamine</td><td>1.47</td></tr>
                <tr><td>C–O</td><td>methanol</td><td>1.43</td></tr>
                
                <tr><td colspan="3" style="background: var(--primary); color: white;">Double bonds</td></tr>
                <tr><td>C=C</td><td>ethylene</td><td>1.34</td></tr>
                <tr><td>C=N</td><td>imine</td><td>1.30</td></tr>
                <tr><td>C=O</td><td>formaldehyde</td><td>1.23</td></tr>
                
                <tr><td colspan="3" style="background: var(--primary); color: white;">Triple bonds</td></tr>
                <tr><td>C≡C</td><td>acetylene</td><td>1.20</td></tr>
                <tr><td>C≡N</td><td>acetonitrile</td><td>1.16</td></tr>
                
                <tr><td colspan="3" style="background: var(--primary); color: white;">Aromatic</td></tr>
                <tr><td>C–C (benzene)</td><td>benzene</td><td>1.40</td></tr>
            </table>
            
            <p><strong>Notice:</strong> More s-character = shorter bond. sp (33% shorter) < sp² < sp³ (longest). Aromatic bonds are in between single and double.</p>

            <!-- Figure 2.30 placeholder -->
            <h2>Three Ways to Build a Molecule</h2>
            
            <p>Scientists use different types of models depending on what they want to learn. Figure 2.30 shows the same molecule (4,4-dimethylcyclohexanecarboxylic acid) in three styles:</p>

            <div class="model-grid">
                <div class="model-card">
                    <div class="icon">🕸️</div>
                    <div class="title">Framework</div>
                    <div class="desc">Shows bonds only. Tubes = bonds, connectors = atoms. Great for seeing the skeleton and shape.</div>
                </div>
                <div class="model-card">
                    <div class="icon">⚾</div>
                    <div class="title">Ball-and-Stick</div>
                    <div class="desc">Balls = atoms, sticks = bonds. Shows atoms and bonds clearly. Looks nice, but atoms look bigger than they really are.</div>
                </div>
                <div class="model-card">
                    <div class="icon">🔮</div>
                    <div class="title">Space-Filling</div>
                    <div class="desc">Atoms are sized to show their actual electron clouds. Best for seeing the true size and how molecules fit together (like in drug design).</div>
                </div>
            </div>

            <!-- Figure placeholder -->
            <div class="image-container">
                <div style="background: rgba(99,102,241,0.1); padding: 2rem; text-align: center; color: var(--text-muted); display: flex; gap: 1rem; justify-content: center;">
                    <div>[Framework]</div>
                    <div>[Ball-and-Stick]</div>
                    <div>[Space-Filling]</div>
                </div>
                <div class="image-caption">Figure 2.30: Three views of 4,4-dimethylcyclohexanecarboxylic acid. Each tells you something different.</div>
            </div>

            <!-- Which one to use? -->
            <h2>Which Model Should You Use?</h2>
            
            <div class="info-box">
                <p><span>📌</span> <strong>Framework:</strong> Best for understanding bonding and basic shape. It's like the skeleton.</p>
                <p><span>📌</span> <strong>Ball-and-Stick:</strong> Good for presentations – you can see atoms and bonds clearly.</p>
                <p><span>📌</span> <strong>Space-Filling:</strong> Essential for biology – shows how molecules actually occupy space and interact with proteins or DNA.</p>
            </div>
            
            <p>They're not competitors – they're <span class="highlight">complementary</span>. Use the right tool for the job!</p>

            <!-- Computer modeling -->
            <h2>Modern Modeling: Computers</h2>
            
            <p>Today, we often use <span class="highlight-blue">computer graphics</span> instead of plastic kits. Programs can:</p>
            <ul style="margin: 1rem 0 1rem 1.5rem;">
                <li>Show any of the three model types instantly</li>
                <li>Rotate molecules so you can view from any angle</li>
                <li>Calculate the <strong>lowest energy shape</strong> (because real molecules bend a little from perfect angles)</li>
                <li>Predict how molecules will interact (like a drug docking into a protein)</li>
            </ul>

            <!-- Fun fact about colors -->
            <div class="fun-fact">
                <div class="emoji">🎨</div>
                <div><strong>Model color code:</strong> Carbon = black/gray, Hydrogen = white, Oxygen = red, Nitrogen = blue. You'll see this everywhere!</div>
            </div>

            <!-- Why this matters -->
            <h2>Why Size and Shape Matter</h2>
            
            <p>Imagine a key trying to fit into a lock. If the key is too big, too small, or the wrong shape – it won't work. Same with molecules in your body:</p>
            
            <ul style="margin: 1rem 0 1rem 1.5rem;">
                <li>Enzymes have specific pockets that only certain molecules can fit into</li>
                <li>Drugs are designed to fit perfectly into those pockets</li>
                <li>That's why understanding 3D shape is <strong>critical</strong> in medicine</li>
            </ul>

            <!-- Summary -->
            <hr>

            <div class="fun-fact">
                <div class="emoji">🧪</div>
                <div><strong>Coming up:</strong> That's the end of Atomic Structure & Bonding! Next, we'll start applying these ideas to real chemical reactions.</div>
            </div>

            <!-- Completion message -->
            <div style="background: var(--primary); color: white; padding: 1.5rem; border-radius: 20px; text-align: center; margin: 2rem 0;">
                <p style="font-size: 1.3rem; font-weight: 700;">🎉 Congratulations!</p>
                <p>You've completed the Atomic Structure & Bonding module. You now know how atoms are built, how they bond, and what molecules look like in 3D. Great work!</p>
            </div>

        </div>
        <div class="footer">Raven Academy · chemistry made simple</div>
    </div>
</body>
</html>