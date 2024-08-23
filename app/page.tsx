"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import AnalysisResult from "@/components/analysis-result";

type PredictionResult = {
  text: string;
  prediction: 'AI-generated' | 'Human-written';
  confidence: number;
};

type TypewriterTextProps = {
  texts: string[];
};

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const typeText = () => {
      if (!isDeleting && displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else if (isDeleting) {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        setTimeout(() => setIsDeleting(true), 1000); // Wait before deleting
      }
    };

    const timer = setTimeout(typeText, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentTextIndex, displayText, isDeleting, texts]);

  return (
    <h2 className="text-violet-600 text-xl font-medium h-8 font-mono">
      {displayText}
      <span className="animate-blink">|</span>
    </h2>
  );
};

const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<PredictionResult | null>({
    text: "This is a sample text",
    prediction: 'AI-generated',
    confidence: 0.90
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const descriptionTexts: string[] = [
    "Analyze your text with AI",
    "Uncover hidden insights",
    "Enhance your understanding",
    "Powered by advanced NLP"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex flex-col items-center justify-start p-6">
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-6xl font-space-grotesk font-bold text-violet-800 mb-4">Authenti-Text</h1>
        <TypewriterText texts={descriptionTexts} />
      </header>
      
      <main className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <Textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            placeholder="Paste the text to analyze..."
            className="w-full h-48 p-4 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Text"
            )}
          </Button>
        </div>
        {result && <AnalysisResult result={result} />}
      </main>
    </div>
  );
};

export default Home;