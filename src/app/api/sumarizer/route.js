// import { ChatOpenAI } from "@langchain/openai";

// export async function POST(req) {
//   try {
//     const { message } = await req.json();
//    console.log(message,"recive");
   
//     const model = new ChatOpenAI({
//       model: "gpt-4",
//       temperature: 1.5,
//       // maxCompletionTokens: 60,
//       apiKey: process.env.OPENAI_API_KEY, // from .env.local
//     });

//     const result = await model.invoke(message);

//     return new Response(
//       JSON.stringify({ response: result.content }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500 }
//     );
//   }
// }


//  if use chain-------------------------->
import { NextResponse } from "next/server";
import { summarizerPrompt } from "@/lib/promptTemplate";
import { ChatOpenAI } from "@langchain/openai";

export async function POST(req) {
  try {
    const { paper, explain, para } = await req.json();
  console.log(explain,"revinnnig");
  
    // const llm = new ChatOpenAI({
    //   model: "gpt-4", // or gpt-4o-mini
    //   temperature: 0.7,
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
const llm = new ChatOpenAI({
  model: "gpt-5", // or "gpt-4o-mini"
  apiKey: process.env.OPENAI_API_KEY,
});

    // Pipe prompt → LLM
    const chain = summarizerPrompt.pipe(llm);

    // Run chain
    const response = await chain.invoke({ paper, explain, para });

    return NextResponse.json({
      success: true,
      summary: response.content, // ChatOpenAI returns { content }
    });
  } catch (err) {
    console.error("Error in summarizer API:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
