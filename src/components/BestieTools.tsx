import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ClipboardText,
  Envelope,
  PencilSimpleLine,
  BookmarkSimple,
  Plus,
  Check,
  Sparkle,
  DotsThreeVertical,
  TrashSimple,
  Calendar,
  Clock,
  GraduationCap,
  Users,
} from "@phosphor-icons/react";
import type { SavedItem, SavedItemType } from "../types/bestie";

interface ToolCard {
  id: SavedItemType;
  icon: typeof BookOpen;
  label: string;
  description: string;
  color: string;
  bgClass: string;
}

const TOOLS: ToolCard[] = [
  {
    id: "lesson",
    icon: BookOpen,
    label: "Lesson Planner",
    description: "Design engaging, standards-aligned lessons in minutes",
    color: "#F43F5E",
    bgClass: "from-rose-100 to-rose-50 dark:from-rose-950/40 dark:to-rose-950/20",
  },
  {
    id: "report",
    icon: ClipboardText,
    label: "Report Card Comments",
    description: "Personalized, thoughtful comments for every student",
    color: "#8B5CF6",
    bgClass: "from-violet-100 to-violet-50 dark:from-violet-950/40 dark:to-violet-950/20",
  },
  {
    id: "communication",
    icon: Envelope,
    label: "Parent Communication",
    description: "Empathetic drafts for any school situation",
    color: "#06B6D4",
    bgClass: "from-cyan-100 to-cyan-50 dark:from-cyan-950/40 dark:to-cyan-950/20",
  },
  {
    id: "worksheet",
    icon: PencilSimpleLine,
    label: "Worksheet Generator",
    description: "Create custom practice materials and quizzes",
    color: "#F59E0B",
    bgClass: "from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-950/20",
  },
];

const SAVED_ITEMS: SavedItem[] = [
  {
    id: "saved-1",
    type: "lesson",
    label: "Photosynthesis Lab",
    preview: "A hands-on 5th grade science lesson exploring how plants convert sunlight...",
    data: null as any,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "saved-2",
    type: "report",
    label: "Sophia M. - Q1 Review",
    preview: "Sophia has shown remarkable growth in reading comprehension this quarter...",
    data: null as any,
    createdAt: Date.now() - 172800000,
  },
  {
    id: "saved-3",
    type: "communication",
    label: "Conference Reminder",
    preview: "Dear Families, I'm delighted to invite you to our upcoming parent-teacher...",
    data: null as any,
    createdAt: Date.now() - 259200000,
  },
];

const typeIcons: Record<SavedItemType, typeof BookOpen> = {
  lesson: BookOpen,
  report: ClipboardText,
  communication: Envelope,
  worksheet: PencilSimpleLine,
};

const typeColors: Record<SavedItemType, string> = {
  lesson: "#F43F5E",
  report: "#8B5CF6",
  communication: "#06B6D4",
  worksheet: "#F59E0B",
};

const typeLabels: Record<SavedItemType, string> = {
  lesson: "Lesson Plan",
  report: "Report Card",
  communication: "Communication",
  worksheet: "Worksheet",
};

function GeneratorForm({ tool, onBack }: { tool: ToolCard; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const formFields: Record<string, { label: string; placeholder: string }[]> = {
    lesson: [
      { label: "Grade Level", placeholder: "e.g. 5th Grade" },
      { label: "Subject", placeholder: "e.g. Science" },
      { label: "Topic", placeholder: "e.g. Photosynthesis" },
      { label: "Learning Objective", placeholder: "What should students know by the end?" },
    ],
    report: [
      { label: "Student Name", placeholder: "e.g. Alex Johnson" },
      { label: "Subject Area", placeholder: "e.g. Mathematics" },
      { label: "Key Strengths", placeholder: "What does this student excel at?" },
      { label: "Growth Areas", placeholder: "Where can they improve?" },
    ],
    communication: [
      { label: "Recipient", placeholder: "e.g. The Garcia Family" },
      { label: "Topic", placeholder: "e.g. Upcoming field trip" },
      { label: "Tone", placeholder: "Warm, professional, or celebratory?" },
      { label: "Key Message", placeholder: "What's the main thing to communicate?" },
    ],
    worksheet: [
      { label: "Grade Level", placeholder: "e.g. 3rd Grade" },
      { label: "Subject", placeholder: "e.g. Math" },
      { label: "Topic", placeholder: "e.g. Multiplication Tables" },
      { label: "Number of Questions", placeholder: "e.g. 10" },
    ],
  };

  const fields = formFields[tool.id] || formFields.lesson;
  const [values, setValues] = useState<string[]>(fields.map(() => ""));

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const samples: Record<string, string> = {
        lesson: `## ${values[2] || "Interactive Lesson"}

**Grade:** ${values[0] || "5th Grade"} | **Subject:** ${values[1] || "Science"}

**Objective:** ${values[3] || "Students will understand core concepts"}

### Hook (5 min)
Start with a surprising question or demo to spark curiosity.

### Direct Instruction (10 min)
Introduce key vocabulary and concepts with visual aids.

### Guided Practice (15 min)
Work through examples together as a class.

### Independent Work (15 min)
Students apply concepts individually or in pairs.

### Exit Ticket (5 min)
Quick formative assessment to check understanding.`,
        report: `### ${values[0] || "Student"} — ${values[1] || "Subject"} Report

**Strengths:** ${values[2] || "Shows great enthusiasm and participates actively in class discussions. Demonstrates strong critical thinking skills when approaching new problems."}

**Areas for Growth:** ${values[3] || "Could benefit from developing more consistent study habits and double-checking work before submission."}

**Recommendations:** Continue practicing at home with provided resources. Consider joining the after-school tutoring program for extra support.`,
        communication: `Dear ${values[0] || "Families"},

I hope this message finds you well. I'm writing to share some information regarding ${values[1] || "our upcoming class activities"}.

${values[3] || "We have some exciting developments in our classroom that I wanted to share with you. Your child's engagement and growth have been wonderful to witness."}

I'd love to discuss this further during our upcoming conference. Please feel free to reach out with any questions.

Warmly,
Your Child's Teacher`,
        worksheet: `## ${values[2] || "Practice Worksheet"}

**Grade:** ${values[0] || "3rd Grade"} | **Subject:** ${values[1] || "Math"}

**Instructions:** Answer each question carefully. Show your work where applicable.

1. _________________________________________
2. _________________________________________
3. _________________________________________
4. _________________________________________
5. _________________________________________

**Bonus Challenge:** _________________________________________`,
      };
      setResult(samples[tool.id] || samples.lesson);
      setIsGenerating(false);
      setStep(1);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
        </motion.button>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: tool.color + "20" }}
        >
          <tool.icon size={22} weight="fill" style={{ color: tool.color }} />
        </div>
        <div>
          <h3 className="font-display font-semibold">{tool.label}</h3>
          <p className="text-xs text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {fields.map((field, i) => (
              <div key={i}>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {field.label}
                </label>
                <input
                  value={values[i] || ""}
                  onChange={(e) => {
                    const next = [...values];
                    next[i] = e.target.value;
                    setValues(next);
                  }}
                  placeholder={field.placeholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background/50 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800 transition-all"
                />
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full gradient-bg text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkle size={18} weight="fill" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkle size={18} weight="fill" />
                  Generate with AI
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
              <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(0)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent/50 transition-colors"
              >
                Generate Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 gradient-bg text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5"
              >
                <Check size={16} weight="bold" />
                Save
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BestieTools() {
  const [activeTool, setActiveTool] = useState<ToolCard | null>(null);
  const [activeTab, setActiveTab] = useState<"tools" | "saved">("tools");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const SavedIcon = BookmarkSimple;

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="flex gap-1 p-3 border-b border-border/50">
        <button
          onClick={() => setActiveTab("tools")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "tools"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              : "text-muted-foreground hover:bg-accent/50"
          }`}
        >
          Tools
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "saved"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              : "text-muted-foreground hover:bg-accent/50"
          }`}
        >
          <SavedIcon size={16} />
          Saved
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          {activeTab === "tools" ? (
            activeTool ? (
              <GeneratorForm key="form" tool={activeTool} onBack={() => setActiveTool(null)} />
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-3"
              >
                {TOOLS.map((tool, i) => (
                  <motion.button
                    key={tool.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTool(tool)}
                    className={`relative overflow-hidden rounded-2xl p-5 text-left bg-gradient-to-br ${tool.bgClass} border border-border/50 group`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: tool.color + "20" }}
                      >
                        <tool.icon size={24} weight="fill" style={{ color: tool.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base">{tool.label}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                      </div>
                      <motion.div
                        className="shrink-0 mt-1"
                        whileHover={{ x: 3 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {SAVED_ITEMS.length === 0 ? (
                <div className="text-center py-12">
                  <BookmarkSimple size={40} className="mx-auto text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground mt-3">No saved items yet</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Generated content will appear here
                  </p>
                </div>
              ) : (
                SAVED_ITEMS.map((item) => {
                  const Icon = typeIcons[item.type];
                  const color = typeColors[item.type];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <button className="w-full glass-card rounded-2xl p-4 text-left group">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: color + "15" }}
                          >
                            <Icon size={20} weight="fill" style={{ color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-semibold text-sm">{item.label}</h4>
                              <span
                                className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: color + "15", color }}
                              >
                                {typeLabels[item.type]}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.preview}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpen(menuOpen === item.id ? null : item.id);
                            }}
                            className="p-1 rounded-lg hover:bg-accent/50 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <DotsThreeVertical size={16} />
                          </button>
                        </div>
                      </button>
                      <AnimatePresence>
                        {menuOpen === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-12 z-20 glass-card rounded-xl overflow-hidden shadow-lg"
                          >
                            <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full transition-colors">
                              <TrashSimple size={16} />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}