import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatDots,
  Sparkle,
  PaperPlaneRight,
  CaretDown,
  XCircle,
  Smiley,
  Lightbulb,
  Heart,
} from "@phosphor-icons/react";
import { PERSONAS, type BestiePersona, type ChatMessage } from "../types/bestie";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hey bestie! 👋 I'm so excited to help you today! What kind of magic shall we make for your classroom?",
    timestamp: Date.now(),
    personaId: "chloe",
  },
];

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: "Lesson Idea", prompt: "Help me brainstorm a creative lesson idea for..." },
  { icon: Heart, label: "Encouragement", prompt: "I need a pick-me-up. Tell me something encouraging about teaching!" },
  { icon: Smiley, label: "Icebreaker", prompt: "Give me a fun icebreaker activity for my class" },
];

export default function BestieChat() {
  const [activePersona, setActivePersona] = useState<BestiePersona>(PERSONAS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPersonas, setShowPersonas] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responses: Record<string, string> = {
        chloe: `Ooh, I love this idea! 💡 Let me think... Here's what I'd suggest for "${text}" — how about we start with a fun hook, then build in some hands-on activities? I can already feel the excitement in the room! ✨`,
        marcus: `Great question! Let's break "${text}" down step by step. 📋 First, let's identify the key learning objectives, then we'll map out the perfect structure. I've got a template that'll make this a breeze! 📌`,
        sarah: `That's a thoughtful direction. 🦉 For "${text}", I'd recommend we consider the research-backed approaches. Let's start with what we know works, then adapt it to your unique classroom context. 📚`,
      };
      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responses[activePersona.id] || responses.chloe,
        timestamp: Date.now(),
        personaId: activePersona.id,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const switchPersona = (persona: BestiePersona) => {
    setActivePersona(persona);
    setShowPersonas(false);
    const switchMsg: ChatMessage = {
      id: `switch-${Date.now()}`,
      role: "assistant",
      content: persona.greeting,
      timestamp: Date.now(),
      personaId: persona.id,
    };
    setMessages((prev) => [...prev, switchMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-rose-50/50 via-white to-orange-50/30 dark:from-rose-950/10 dark:via-background dark:to-orange-950/10">
      {/* Persona Selector */}
      <div className="relative px-4 pt-4 pb-2">
        <button
          onClick={() => setShowPersonas(!showPersonas)}
          className="glass-card flex items-center gap-3 px-4 py-3 rounded-xl w-full group"
        >
          <span className="text-2xl">{activePersona.avatar}</span>
          <div className="flex-1 text-left">
            <p className="font-display font-semibold text-sm">{activePersona.name}</p>
            <p className="text-xs text-muted-foreground">{activePersona.title}</p>
          </div>
          <motion.div animate={{ rotate: showPersonas ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <CaretDown size={18} className="text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showPersonas && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-4 right-4 z-20 mt-1 glass-card rounded-xl overflow-hidden"
            >
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => switchPersona(p)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-accent/50 ${
                    activePersona.id === p.id ? "bg-accent/30" : ""
                  }`}
                >
                  <span className="text-2xl">{p.avatar}</span>
                  <div>
                    <p className="font-display font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.title}</p>
                  </div>
                  {activePersona.id === p.id && (
                    <motion.div
                      layoutId="check"
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "gradient-bg text-white rounded-br-md"
                    : "glass-card rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" && msg.personaId && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">
                      {PERSONAS.find((p) => p.id === msg.personaId)?.avatar}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {PERSONAS.find((p) => p.id === msg.personaId)?.name}
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="glass-card rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">{activePersona.avatar}</span>
                <div className="flex gap-1">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 bg-rose-400 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    className="w-1.5 h-1.5 bg-rose-400 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-1.5 bg-rose-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          {QUICK_ACTIONS.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSend(action.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-950/50 transition-colors"
            >
              <action.icon size={14} />
              {action.label}
            </motion.button>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-2 glass-card rounded-2xl px-4 py-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask your Bestie for help..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-xl gradient-bg text-white disabled:opacity-40 transition-opacity"
          >
            <PaperPlaneRight size={18} weight="fill" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}