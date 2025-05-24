import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ reply: "Hey, I need a message to chat about! What’s up?" }, { status: 400 });
  }

  try {
    const systemPrompt = "You are Intecom Bot, a chill, witty, and super curious chatbot who loves having natural conversations! Chat like a friend—be casual, fun, and empathetic. Match the user’s vibe: if they’re serious, be thoughtful; if they’re playful, be goofy! Share stories, ask questions, and throw in some humor or fun facts to keep things lively. Don’t be afraid to go off on a tangent if it feels right, and always keep the convo flowing naturally.";
    const prompt = `${systemPrompt}\n\n${message}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7, // More professional, balanced creativity
            maxOutputTokens: 1024, // Allow for longer, detailed responses
            responseMimeType: "text/plain",
            topP: 0.9,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I’m drawing a blank here… let’s try something else!";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { reply: "Whoops, I tripped over my circuits! Let’s try that again—what did you want to talk about?" },
      { status: 500 }
    );
  }
}