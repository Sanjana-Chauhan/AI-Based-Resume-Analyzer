"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackDisplay from "@/components/ui/FeedbackDisplay";
import { Coming_Soon } from "next/font/google";

interface Feedback {
  ats_score: number;
  ats_score_details: AtsScoreDetails;
  overall_evaluation: OverallEvaluation;
  ats_optimization: AtsOptimization;
  skills_analysis: SkillsAnalysis;
  section_feedback: SectionFeedback;
  impact_assessment: ImpactAssessment;
  improvement_suggestions: string[];
  role_specific_recommendations: RoleSpecificRecommendations;
  suitable_roles: string[];
  visibility_enhancement: string[];
  summary: string;
}

interface AtsScoreDetails {
  formatting: number;
  keywords: number;
  experience_alignment: number;
  grammar_and_clarity: number;
}

interface OverallEvaluation {
  strengths: string[];
  weaknesses: string[];
}

interface AtsOptimization {
  formatting_issues: string[];
  missing_keywords: string[];
  parsing_risks: string[];
}

interface SkillsAnalysis {
  extracted_skills: string[];
  missing_skills: string[];
  skill_gap_analysis: string;
}

interface SectionFeedback {
  contact_info: string;
  summary: string;
  experience: string;
  education: string;
  certifications: string;
}

interface ImpactAssessment {
  achievement_quality: string;
  action_language: string;
}

interface RoleSpecificRecommendations {
  FrontendDeveloper: string[];
  FullStackDeveloper: string[];
  SoftwareEngineer: string[];
}

interface ParsedResponse {
  feedback: Feedback;
}

const ResultFeedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("feedbackData");
      if (!storedData) {
        setError("No feedback data found");
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      const parsedData = JSON.parse(JSON.parse(storedData));
      console.log(parsedData);
      if (!parsedData.feedback?.ats_score) {
        throw new Error("Invalid feedback data format");
      }

      setFeedbackData(parsedData.feedback);
    } catch (error) {
      console.error("Error retrieving feedback data:", error);
      setError("Error processing feedback data");
      setTimeout(() => router.push("/"), 3000);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 py-5 px-4 sm:px-6 lg:px-8 ml-64">
      <div className="max-w-5xl mx-auto bg-white py-4  rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          🎯 Resume Feedback Analysis
        </h1>

        {error ? (
          <p className="text-center text-red-500">❗ {error}. Redirecting...</p>
        ) : feedbackData ? (
          <FeedbackDisplay feedback={feedbackData} />
        ) : (
          <p className="text-center text-gray-500">Loading feedback...</p>
        )}
      </div>
    </div>
  );
};
export default ResultFeedback;
