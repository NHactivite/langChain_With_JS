"use client";
import React, { useState } from "react";

const PromptBox = () => {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading before API call
    console.log("kpp");

    try {
      const res = await fetch("/api/sumarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      console.log("lpp");
      const data = await res.json();
      setSearchData(data.response);
      console.log(data.response, "koo");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false); // ✅ Always stop loading after API
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="border rounded-md pl-2"
          placeholder="enter text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="m-5 bg-gray-300 px-2 rounded-md"
          type="submit"
          disabled={loading} // ✅ now works
        >
          {loading ? "Compressing..." : "Compress"}
        </button>
      </form>

      {searchData.length > 0 ? (
        <div className="mt-5 max-w-3xl border p-1">{searchData}</div>
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
};

export default PromptBox;
