"use client";
import React, { useState } from "react";
// import { PromptTemplate} from "@langchain/core/prompts";
import { summarizerPrompt } from "@/lib/promptTemplate";
const PromptBox = () => {
   const paperData=["Attention Is All You Need", "BERT: Pre-training of Deep Bidirectional Transformers", "GPT-3: Language Models are Few-Shot Learners", "Diffusion Models Beat GANs on Image Synthesis"]
  const explanation=["Beginner-Friendly", "Technical", "Code-Oriented", "Mathematical"]
  const paragraph=["Short (1-2 paragraphs)", "Medium (3-5 paragraphs)", "Long (detailed explanation)"] 
  
  // const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);
   const [paper,setPaper]=useState("")
   const [explain,setExplain]=useState("")
   const [para,setPara]=useState("")

   //  if not use chain ------->
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); 

  //   const prompt = await summarizerPrompt.format({
  //       paper,
  //       explain,
  //       para,
  //     });

  
  //   try {
  //     const res = await fetch("/api/sumarizer", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify({ message: input }),
  //       body: JSON.stringify({ message: prompt }),
  //     });

  //     console.log(paper,para,explain,"submit");
  //     const data = await res.json();
  //     setSearchData(data.response);
  //     // console.log(data.response, "koo");
  //   } catch (err) {
  //     console.error("Error:", err);
  //   } finally {
  //     setLoading(false); 
  //   }
  // };

  // if use chain----------->
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(paper,explain,para,"client");
    

    try {
      const res = await fetch("/api/sumarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper, explain, para }),
      });

      const data = await res.json();

      if (data.success) {
        setSearchData(data.summary);
      } else {
        setSearchData("Error: " + data.error);
      }
    } catch (err) {
      console.error("Client error:", err);
      setSearchData("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col items-center">
       {/* <input
          className="border rounded-md pl-2"
          placeholder="enter text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        /> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
       <label htmlFor="paper" >Choose Paper</label>
       <select id="paper" className="border p-1 rounded-md" value={paper} onChange={(e)=>setPaper(e.target.value)}  >
        <option>selete</option>
        {
          paperData.map((i,idx)=>(
             <option key={idx} value={i}>{i}</option>
          ))
        }
        </select>
       <label htmlFor="explain" >Choose explanation</label>
       <select id="explain"  className="border p-1 rounded-md" value={explain} onChange={(e)=>setExplain(e.target.value)}  >
        <option>selete</option>
        {
          explanation.map((i,idx)=>(
             <option key={idx} value={i}>{i}</option>
          ))
        }
        </select>
       <label htmlFor="length" >Choose Paragraph length</label>
       <select id="length"  className="border p-1 rounded-md" value={para} onChange={(e)=>setPara(e.target.value)}  >
        <option>selete</option>
        {
          paragraph.map((i,idx)=>(
             <option key={idx} value={i}>{i}</option>
          ))
        }
        </select>
        <button
          className="m-5 bg-gray-300 p-2 rounded-md"
          type="submit"
          disabled={loading} 
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>

      {searchData.length > 0 ? (
        <div className="mt-5 max-w-3xl border p-1 rounded-md">{searchData}</div>
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
};

export default PromptBox;
