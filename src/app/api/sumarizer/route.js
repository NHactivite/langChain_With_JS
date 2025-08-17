import { ChatOpenAI } from "@langchain/openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
   console.log(message,"recive");
   
    const model = new ChatOpenAI({
      model: "gpt-4",
      temperature: 1.5,
      maxCompletionTokens: 60,
      apiKey: process.env.OPENAI_API_KEY, // from .env.local
    });

    const result = await model.invoke(message);

    return new Response(
      JSON.stringify({ response: result.content }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
