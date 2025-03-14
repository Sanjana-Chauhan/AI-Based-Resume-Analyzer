"use client";
import { Search, BarChart, Settings, FileText, PaintBucket } from "lucide-react";
import { ReactNode } from "react";
// TypeScript interface for type safety
interface whyChoose {
  id: number;
  title: string;
  icon: ReactNode;
}

export const whyChoose: { title: string; featuresList: whyChoose[] } = {
  title: "✨ Why Choose ResumeGenie ",
  featuresList: [
    { id: 1, title: "✅ Instant Feedback", icon:"" }, 
    { id: 2, title: "✅ ATS Compatibility Check", icon:"" }, 
    { id: 3, title: "✅ Skill Match", icon:"" },
    { id: 4, title: "✅ Grammar & Formatting Suggestions", icon:"" },
    { id: 5, title: "✅ AI-Powered Insights", icon:"" },
  ],
};


