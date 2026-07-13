export interface BestiePersona {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  emoji: string;
  greeting: string;
  style: "warm" | "energetic" | "calm";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  personaId?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  topic: string;
  objective: string;
  hook: string;
  directInstruction: string;
  guidedPractice: string;
  independentWork: string;
  standards: string;
  createdAt: number;
}

export interface ReportCardComment {
  id: string;
  studentName: string;
  pronouns: string;
  strengths: string;
  growthAreas: string;
  tone: "warm" | "constructive" | "professional";
  comment: string;
  createdAt: number;
}

export interface ParentCommunication {
  id: string;
  subject: string;
  mood: "empathetic" | "firm" | "celebratory";
  topic: string;
  draft: string;
  createdAt: number;
}

export interface Worksheet {
  id: string;
  title: string;
  grade: string;
  subject: string;
  questionCount: number;
  questionTypes: string[];
  questions: string[];
  createdAt: number;
}

export type SavedItemType = "lesson" | "report" | "communication" | "worksheet";

export interface SavedItem {
  id: string;
  type: SavedItemType;
  label: string;
  preview: string;
  data: LessonPlan | ReportCardComment | ParentCommunication | Worksheet;
  createdAt: number;
}

export const PERSONAS: BestiePersona[] = [
  {
    id: "chloe",
    name: "Ms. Chloe",
    title: "The Creative Bestie",
    avatar: "🎨",
    color: "#F43F5E",
    emoji: "✨",
    greeting: "Hey bestie! Ready to make something amazing today?",
    style: "energetic",
  },
  {
    id: "marcus",
    name: "Mr. Marcus",
    title: "The Organizer Bestie",
    avatar: "📋",
    color: "#8B5CF6",
    emoji: "📌",
    greeting: "Let's get organized and knock this out together!",
    style: "warm",
  },
  {
    id: "sarah",
    name: "Dr. Sarah",
    title: "The Wisdom Bestie",
    avatar: "📚",
    color: "#06B6D4",
    emoji: "🦉",
    greeting: "Hello, wonderful teacher. Let's find the perfect words.",
    style: "calm",
  },
];