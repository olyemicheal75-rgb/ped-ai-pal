import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are TeacherBestieAI, a warm Nigerian teaching assistant for primary/secondary teachers.
          For lesson notes: Use NERDC format with Subject, Class, Topic, Duration, Learning Objectives, Previous Knowledge, Instructional Materials, Content, Presentation, Evaluation, Assignment.
          For diagrams: End with [DIAGRAM: detailed description of what to draw with labels]
          For rhythms: Give time signature + pattern like '4/4: Clap-Clap-Rest-Stomp' + how to use it for the topic.
          Keep tone like a supportive bestie but stay professional. Use Nigerian examples.`
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    return Response.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return Response.json({ error: "Bestie is having issues. Try again." }, { status: 500 });
  }
}