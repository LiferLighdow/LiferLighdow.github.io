export type Sender = 'user' | 'ai';

export type Gender = 'female' | 'male' | 'neutral' | 'none';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}

export interface ProfileData {
  name: string;
  gender: Gender;
  avatar: string; // URL or base64 data string
  relationship: string;
  backstory: string;
  interests: string;
  openingLine: string;
}

export interface ExportData {
  profile: ProfileData;
  messages: Message[];
}