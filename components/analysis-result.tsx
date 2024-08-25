import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

type AnalysisResultProps = {
  result: {
    text: string;
    prediction: "AI-generated" | "Human-written";
    confidence: number;
    explanation_url: string;
  };
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const isAIGenerated = result.prediction === "AI-generated";
  const confidencePercentage = (result.confidence * 100).toFixed(1);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-violet-800 mb-4">
        Analysis Result
      </h3>
      <div className="flex items-center mb-4">
        {isAIGenerated ? (
          <AlertCircle className="text-yellow-500 mr-2" size={24} />
        ) : (
          <CheckCircle className="text-green-500 mr-2" size={24} />
        )}
        <span
          className={`text-lg font-medium ${
            isAIGenerated ? "text-yellow-700" : "text-green-700"
          }`}
        >
          {result.prediction}
        </span>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Confidence</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              isAIGenerated ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600 mt-1">
          {confidencePercentage}%
        </p>
      </div>
      <div>
        <Image
          src={result.explanation_url}
          alt="explanation"
          width={2000}
          height={2000}
        />
      </div>
    </div>
  );
};

export default AnalysisResult;
