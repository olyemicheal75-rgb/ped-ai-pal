const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callGroqAPI(messages: Array<{ role: string; content: string }>, maxTokens: number = 1024): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('VITE_GROQ_API_KEY is not configured');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function getBestieReply(tool: string, values: string[]) {
  // Handle chat and simple single-value tools for free-form conversation
  if (tool === "chat" || ["lesson-plan", "quiz-maker", "explain-like", "assignment"].includes(tool)) {
    const message = values[0];
    const systemPrompts: Record<string, string> = {
      chat: "You are TeacherBestieAI, a helpful Nigerian teacher assistant. Respond warmly and professionally to questions about education, lesson planning, and teaching strategies. Use Nigerian examples where relevant.",
      "lesson-plan": "You are TeacherBestieAI, an expert Nigerian teacher assistant. Create a NERDC-compliant lesson plan or note for the given topic. Format with clear sections: Objectives, Duration, Materials, Content, Procedure, Evaluation, and Assignment. Use Nigerian examples.",
      "quiz-maker": "You are TeacherBestieAI. Create an engaging quiz with 5-8 questions based on the given topic. Include the answer key. Make questions clear and varied (multiple choice, short answer, etc.).",
      "explain-like": "You are TeacherBestieAI. Explain the given topic in simple, easy-to-understand language suitable for 12-year-olds. Use everyday examples and analogies. Avoid jargon.",
      "assignment": "You are TeacherBestieAI. Create an engaging classroom assignment based on the given topic. Include clear instructions, learning outcomes, and grading criteria. Make it interactive and fun."
    };
    
    return callGroqAPI([
      { role: "system", content: systemPrompts[tool] || systemPrompts.chat },
      { role: "user", content: message }
    ], 1024);
  }

  // Handle multi-value tools
  const prompts: Record<string, string> = {
    lesson: `You are TeacherBestieAI, an expert Nigerian teacher assistant. Create a FULL NERDC-compliant lesson note.
Grade: ${values[0]}, Subject: ${values[1]}, Topic: ${values[2]}, Objective: ${values[3]}
Format: Subject, Class, Topic, Duration (40 mins), Learning Objectives, Previous Knowledge, Instructional Materials, Content Development (step by step), Presentation Procedure, Evaluation, Assignment, Conclusion. Use Nigerian examples and keep tone warm like a bestie.`,

    report: `Write a thoughtful report card comment.
Student: ${values[0]}, Subject: ${values[1]}, Strengths: ${values[2]}, Growth Areas: ${values[3]}
Make it warm, professional, Nigerian parent-friendly, specific. 3-4 sentences.`,

    communication: `Write a parent communication letter.
Recipient: ${values[0]}, Topic: ${values[1]}, Tone: ${values[2]}, Key Message: ${values[3]}
Warm, empathetic, professional. Keep it concise.`,

    worksheet: `Create a worksheet.
Grade: ${values[0]}, Subject: ${values[1]}, Topic: ${values[2]}, Number of Questions: ${values[3]}
Include instructions, questions, and answer key. Nigerian context.`
  };

  return callGroqAPI([
    { role: "user", content: prompts[tool] || prompts.lesson }
  ], 2048);
}