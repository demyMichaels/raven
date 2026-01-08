export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SessionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export interface AudioVisualizerState {
  volume: number;
}