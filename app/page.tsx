"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      console.log("came");
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="text-violet-800 text-4xl mb-7">AIGT</div>
      <div className="mb-7 w-96 h-72">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text..."
        />
      </div>

      <div className="flex place-items-center z-10">
        <Button size="lg" onClick={handleAnalyze}>
          Analyze the text
        </Button>
      </div>
      {result && (
        <div className="mt-7 text-violet-800">
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(result.prediction, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
