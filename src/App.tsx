import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Sparkle,
  BookOpen,
  ChatDots,
  SquaresFour,
  Star,
  Heart,
  Lightbulb,
  MusicNote,
  Smiley,
} from "@phosphor-icons/react";
import BestieChat from "./components/BestieChat";
import BestieTools from "./components/BestieTools";

const GREETINGS = [
  "Good morning, Teacher Bestie! ☀️",
  "Hey there, superstar educator! ⭐",
  "Ready to make magic today? ✨",
  "Time to shine, teacher! 🌟",
  "Your classroom adventure awaits! 🚀",
];

const QUOTE = {
  text: "Teaching is the one profession that creates all other professions.",
  author: "Unknown",
};

const QUICK_STATS = [
  { icon: BookOpen, label: "Lessons Created", value: "12", color: "#F43F5E" },
  { icon: Heart, label: "Comments Written", value: "48", color: "#8B5CF6" },
  { icon: Star, label: "Hours Saved", value: "24", color: "#F59E0B" },
  { icon: ChatDots, label: "Conversations", value: "156", color: "#06B6D4" },
];

const DAILY_TIPS = [
  { icon: Lightbulb, text: "Try a 'think-pair-share' to boost participation today", color: "#F43F5E" },
  { icon: MusicNote, text: "Play calm background music during independent work", color: "#8B5CF6" },
  { icon: Smiley, text: "Start class with a 2-minute mindfulness check-in", color: "#06B6D4" },
];

function StatCard({ icon: Icon, label, value, color, index }: typeof QUICK_STATS[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon size={20} weight="fill" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-display font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [greeting, setGreeting] = useState(GREETINGS[0]);
  const [activeView, setActiveView] = useState<"chat" | "tools">("chat");
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % DAILY_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleDark = useCallback(() => setDarkMode((prev) => !prev), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/40 via-white to-orange-50/30 dark:from-rose-950/10 dark:via-background dark:to-orange-950/10">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center"
            >
              <Sparkle size={22} weight="fill" className="text-white" />
            </motion.div>
            <div>
              <h1 className="font-display font-bold text-lg">
                <span className="gradient-text">Teacher Bestie</span>
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">AI Co-Pilot</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDark}
              className="p-2.5 rounded-xl glass-card hover:bg-accent/50 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Greeting + Quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl">{greeting}</h2>
          <p className="text-sm text-muted-foreground mt-1 italic">
            "{QUOTE.text}" — {QUOTE.author}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {QUICK_STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Daily Tip */}
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-3 mb-6 flex items-center gap-3"
        >
          {(() => {
            const tip = DAILY_TIPS[currentTip];
            const IconComp = tip.icon;
            return (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: tip.color + "15" }}
              >
                {IconComp && <IconComp size={16} weight="fill" style={{ color: tip.color }} />}
              </div>
            );
          })()}
          <p className="text-sm">{DAILY_TIPS[currentTip].text}</p>
        </motion.div>

        {/* View Switcher (Mobile) */}
        <div className="flex md:hidden gap-1 mb-4 p-1 glass-card rounded-xl">
          <button
            onClick={() => setActiveView("chat")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeView === "chat"
                ? "gradient-bg text-white"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            <ChatDots size={16} weight={activeView === "chat" ? "fill" : "regular"} />
            Chat
          </button>
          <button
            onClick={() => setActiveView("tools")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeView === "tools"
                ? "gradient-bg text-white"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            <SquaresFour size={16} weight={activeView === "tools" ? "fill" : "regular"} />
            Tools
          </button>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Panel */}
          <motion.div
            layout
            className={`rounded-2xl overflow-hidden border border-border/50 shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm ${
              activeView === "chat" ? "block" : "hidden md:block"
            }`}
            style={{ minHeight: "500px", maxHeight: "700px" }}
          >
            <BestieChat />
          </motion.div>

          {/* Tools Panel */}
          <motion.div
            layout
            className={`rounded-2xl overflow-hidden border border-border/50 shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm ${
              activeView === "tools" ? "block" : "hidden md:block"
            }`}
            style={{ minHeight: "500px", maxHeight: "700px" }}
          >
            <BestieTools />
          </motion.div>
        </div>
      </main>
    </div>
  );
}