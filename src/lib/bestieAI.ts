import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getBestieReply(tool: string, values: string[]) {

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

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompts[tool] || prompts.lesson }
    ],
  });

  return completion.choices[0].message.content;
}