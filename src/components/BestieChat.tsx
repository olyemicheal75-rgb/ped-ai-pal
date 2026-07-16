import { useState, useRef, useEffect } from "react";
import { getBestieReply } from "../lib/bestieAI";

type Message = {
  role: "user" | "bestie";
  content: string;
};

export function BestieChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bestie", content: "Hi bestie! 👋 I'm TeacherBestieAI. Ask me for lesson notes, diagrams, quiz, or rhythms — NERDC format ready!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getBestieReply("chat", [input]);
      setMessages(prev => [...prev, { role: "bestie", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bestie", content: "Bestie is having small network issue. Try again — check your VITE_GROQ_API_KEY in Vercel." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white border-2 border-black rounded-2xl shadow-xl overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] font-medium leading-relaxed ${
              m.role === "user" 
                ? "bg-black text-white rounded-br-md" 
                : "bg-white border-2 border-black text-black rounded-bl-md shadow-sm"
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white border-2 border-black text-black text-[14px] font-bold animate-pulse">
              Bestie is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input - HIGH CONTRAST */}
      <div className="p-4 bg-white border-t-2 border-black flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask for lesson note, e.g. Photosynthesis SS2..."
          className="flex-1 h-12 px-4 rounded-xl border-2 border-black bg-white text-black text-[15px] font-semibold placeholder:text-zinc-900 placeholder:font-medium outline-none focus:ring-4 focus:ring-black/10"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="h-12 px-6 rounded-xl bg-black text-white font-bold text-[14px] tracking-wide disabled:bg-zinc-400 hover:bg-zinc-900 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default BestieChat;