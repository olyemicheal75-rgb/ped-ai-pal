import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ClipboardText,
  Envelope,
  PencilSimpleLine,
  BookmarkSimple,
  Sparkle,
  Check,
  ArrowLeft,
  DotsThreeVertical,
  TrashSimple,
} from "@phosphor-icons/react";
import type { SavedItem, SavedItemType } from "../types/bestie";

interface ToolCard {
  id: SavedItemType;
  icon: typeof BookOpen;
  label: string;
  description: string;
  tag: string;
}

const TOOLS: ToolCard[] = [
  {
    id: "lesson",
    icon: BookOpen,
    label: "Lesson Planner",
    description: "NERDC-aligned, engaging lessons in seconds",
    tag: "Most used",
  },
  {
    id: "report",
    icon: ClipboardText,
    label: "Report Comments",
    description: "Thoughtful, personalized student feedback",
    tag: "New",
  },
  {
    id: "communication",
    icon: Envelope,
    label: "Parent Comms",
    description: "Clear, empathetic parent communication",
    tag: "Popular",
  },
  {
    id: "worksheet",
    icon: PencilSimpleLine,
    label: "Worksheet Builder",
    description: "Practice sheets & assessments, auto-graded",
    tag: "",
  },
];

// FAKE DATA - you will replace with real saved data later
const SAVED_ITEMS: SavedItem[] = [
  {
    id: "saved-1",
    type: "lesson",
    label: "Photosynthesis Lab",
    preview: "A hands-on 5th grade science lesson exploring how plants convert sunlight...",
    data: null as any,
    createdAt: Date.now() - 86400000,
  },
];

const typeIcons: Record<SavedItemType, typeof BookOpen> = {
  lesson: BookOpen,
  report: ClipboardText,
  communication: Envelope,
  worksheet: PencilSimpleLine,
};

function GeneratorForm({ tool, onBack }: { tool: ToolCard; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const formFields: Record<string, { label: string; placeholder: string }[]> = {
    lesson: [
      { label: "Grade Level", placeholder: "e.g. Primary 5" },
      { label: "Subject", placeholder: "e.g. Basic Science" },
      { label: "Topic", placeholder: "e.g. Photosynthesis" },
      { label: "Learning Objective", placeholder: "What should students master?" },
    ],
    report: [
      { label: "Student Name", placeholder: "e.g. Sophia M." },
      { label: "Subject", placeholder: "e.g. Mathematics" },
      { label: "Strengths", placeholder: "What does she do well?" },
      { label: "Growth Area", placeholder: "Where can she improve?" },
    ],
    communication: [
      { label: "Recipient", placeholder: "e.g. Year 4 Parents" },
      { label: "Topic", placeholder: "e.g. Field Trip" },
      { label: "Tone", placeholder: "Warm, formal, urgent?" },
      { label: "Core Message", placeholder: "Key points to cover" },
    ],
    worksheet: [
      { label: "Grade", placeholder: "e.g. JSS1" },
      { label: "Subject", placeholder: "e.g. English" },
      { label: "Topic", placeholder: "e.g. Parts of Speech" },
      { label: "Questions", placeholder: "e.g. 15" },
    ],
  };

  const fields = formFields[tool.id] || formFields.lesson;
  const [values, setValues] = useState<string[]>(fields.map(() => ""));
const handleGenerate = async () => {
  setIsGenerating(true);
  try {
    const result = await getBestieReply(tool.id, values);