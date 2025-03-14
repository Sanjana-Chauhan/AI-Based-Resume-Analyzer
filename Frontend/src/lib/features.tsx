"use client";
import { Search, BarChart, Settings, FileText, PaintBucket } from "lucide-react";
import { ReactNode } from "react";
// TypeScript interface for type safety
interface Feature {
  id: number;
  title: string;
  icon: ReactNode;
}

export const features: { title: string; featuresList: Feature[] } = {
  title: "✨ Key Features",
  featuresList: [
    { id: 1, title: "Keyword Optimization", icon: <Search className="text-blue-300" /> }, 
    { id: 2, title: "Job Matching Score", icon: <BarChart className="text-purple-300" /> }, 
    { id: 3, title: "Grammar & Readability Check", icon: <Settings className="text-green-300" /> },
    { id: 4, title: "ATS Compliance Check", icon: <FileText className="text-yellow-300" /> },
    { id: 5, title: "Resume Formatting Suggestions", icon: <PaintBucket className="text-pink-300" /> },
  ],
};
