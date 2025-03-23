import React from "react";

interface FeedbackDisplayProps {
  feedback: {
    ats_score: number;
    ats_score_details: {
      formatting: number;
      keywords: number;
      experience_alignment: number;
      grammar_and_clarity: number;
    };
    summary: string;
    overall_evaluation: {
      strengths: string[];
      weaknesses: string[];
    };
    improvement_suggestions: string[];
    ats_optimization: {
      formatting_issues: string[];
      missing_keywords: string[];
      parsing_risks: string[];
    };
    skills_analysis: {
      extracted_skills: string[];
      missing_skills: string[];
    };
    section_feedback: {
      contact_info: string;
      summary: string;
      experience: string;
      education: string;
      certifications: string;
    };
    impact_assessment: {
      achievement_quality: string;
      action_language: string;
    };
    role_specific_recommendations: {
      [role: string]: string[];
    };
    suitable_roles: string[];
    visibility_enhancement: string[];
  };
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  return (
    <div className="space-y-8">
      {/* ATS Score */}
      <section className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">🎯 ATS Score</h2>
        <p className="text-4xl font-bold text-blue-600">{feedback.ats_score}/100</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p className="text-gray-700">📝 Formatting: {feedback.ats_score_details.formatting}/30</p>
          <p className="text-gray-700">🔎 Keywords: {feedback.ats_score_details.keywords}/40</p>
          <p className="text-gray-700">📚 Experience Alignment: {feedback.ats_score_details.experience_alignment}/20</p>
          <p className="text-gray-700">✍️ Grammar & Clarity: {feedback.ats_score_details.grammar_and_clarity}/10</p>
        </div>
      </section>

      {/* Overall Summary */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">📄 Overall Summary</h2>
        <p className="text-gray-700">{feedback.summary}</p>
      </section>

      {/* Strengths and Weaknesses */}
      <section className="grid grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">✅ Strengths</h2>
          <ul className="list-disc list-inside space-y-2">
            {feedback.overall_evaluation.strengths.map((strength, index) => (
              <li key={index} className="text-gray-700">{strength}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">⚠️ Areas for Improvement</h2>
          <ul className="list-disc list-inside space-y-2">
            {feedback.overall_evaluation.weaknesses.map((weakness, index) => (
              <li key={index} className="text-gray-700">{weakness}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section-wise Feedback */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📚 Section-wise Feedback</h2>
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-700">📧 Contact Info: {feedback.section_feedback.contact_info}</li>
          <li className="text-gray-700">📝 Summary: {feedback.section_feedback.summary}</li>
          <li className="text-gray-700">💼 Experience: {feedback.section_feedback.experience}</li>
          <li className="text-gray-700">🎓 Education: {feedback.section_feedback.education}</li>
          <li className="text-gray-700">🏆 Certifications: {feedback.section_feedback.certifications}</li>
        </ul>
      </section>

      {/* Improvement Suggestions */}
      <section className="bg-yellow-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">💡 Improvement Suggestions</h2>
        <ul className="list-disc list-inside space-y-2">
          {feedback.improvement_suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-700">{suggestion}</li>
          ))}
        </ul>
      </section>

      {/* ATS Optimization Issues */}
      <section className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">⚙️ ATS Optimization Issues</h2>
        <ul className="list-disc list-inside space-y-2">
          {feedback.ats_optimization.formatting_issues.map((issue, index) => (
            <li key={index} className="text-gray-700">❗ {issue}</li>
          ))}
          {feedback.ats_optimization.parsing_risks.map((risk, index) => (
            <li key={index} className="text-gray-700">⚡ {risk}</li>
          ))}
        </ul>
      </section>

      {/* Skills Analysis */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">🛠️ Skills Analysis</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-600 mb-2">✅ Detected Skills:</h3>
            <ul className="list-disc list-inside space-y-1">
              {feedback.skills_analysis.extracted_skills.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600 mb-2">🔑 Recommended Additional Skills:</h3>
            <ul className="list-disc list-inside space-y-1">
              {feedback.skills_analysis.missing_skills.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Role-Specific Recommendations */}
      <section className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">🎯 Role-Specific Recommendations</h2>
        {Object.entries(feedback.role_specific_recommendations).map(([role, recommendations], index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-gray-600 mb-2">{role}</h3>
            <ul className="list-disc list-inside space-y-1">
              {recommendations.map((rec, i) => (
                <li key={i} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Suitable Roles */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">💼 Suitable Roles</h2>
        <ul className="list-disc list-inside space-y-2">
          {feedback.suitable_roles.map((role, index) => (
            <li key={index} className="text-gray-700">{role}</li>
          ))}
        </ul>
      </section>

      {/* Visibility Enhancement */}
      <section className="bg-yellow-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-2">📢 Visibility Enhancement Suggestions</h2>
        <ul className="list-disc list-inside space-y-2">
          {feedback.visibility_enhancement.map((suggestion, index) => (
            <li key={index} className="text-gray-700">{suggestion}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FeedbackDisplay;
