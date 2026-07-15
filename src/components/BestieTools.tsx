import { useState } from "react";
import { getBestieReply } from "../lib/bestieAI";

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const tools: Tool[] = [
  { id: "lesson-plan", title: "Lesson Plan Generator", description: "Create a structured lesson plan in seconds", icon: "📚" },
  { id: "quiz-maker", title: "Quiz Maker", description: "Generate quizzes from any topic", icon: "✏️" },
  { id: "explain-like", title: "Explain Like I'm 12", description: "Simplify any complex topic", icon: "💡" },
  { id: "assignment", title: "Assignment Helper", description: "Create engaging assignments", icon: "📝" },
];

export default function BestieTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (tool: Tool) => {
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setResult("");
    try {
      const values = { topic: inputValue, prompt: inputValue };
      const res = await getBestieReply(tool.id, values);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult("Error generating content. Check your API key in .env.local");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white">
      {/* HIGH CONTRAST HEADER */}
      <h2 className="text-[28px] font-extrabold tracking-tight text-black mb-2">
        Teacher Bestie Tools
      </h2>
      <p className="text-[16px] font-semibold text-zinc-900 mb-8">
        Select a tool and generate classroom content instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              activeTool === tool.id
                ? "border-black bg-black text-white shadow-xl"
                : "border-black bg-white text-black hover:bg-zinc-50 hover:shadow-lg"
            }`}
          >
            <div className="flex gap-3 items-start">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h3 className={`text-[17px] font-bold ${activeTool === tool.id ? "text-white" : "text-black"}`}>
                  {tool.title}
                </h3>
                <p className={`text-[14px] font-medium mt-1 leading-snug ${activeTool === tool.id ? "text-zinc-100" : "text-zinc-900"}`}>
                  {tool.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeTool && (
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <label className="block text-[15px] font-bold text-black mb-3 uppercase tracking-wide">
            What topic do you want?
          </label>
          <div className="flex gap-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. Photosynthesis for SS2 students"
              className="flex-1 h-12 px-4 rounded-xl border-2 border-black bg-white text-[16px] font-semibold text-black placeholder:text-zinc-900 placeholder:font-medium outline-none focus:ring-4 focus:ring-black/10"
            />
            <button
              onClick={() => {
                const tool = tools.find((t) => t.id === activeTool)!;
                handleSubmit(tool);
              }}
              disabled={isGenerating || !inputValue.trim()}
              className="h-12 px-8 rounded-xl bg-black text-white text-[15px] font-bold tracking-wide hover:bg-zinc-900 disabled:bg-zinc-400 disabled:text-white transition-colors"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-5 rounded-xl bg-white border-2 border-zinc-200">
              <p className="text-[13px] font-bold text-black uppercase tracking-widest mb-3">Result</p>
              <div className="text-[16px] font-medium leading-relaxed text-black whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}