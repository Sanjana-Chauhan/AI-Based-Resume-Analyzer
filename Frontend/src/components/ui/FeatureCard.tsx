"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "../../lib/features"; // Import the features array

// Interface for props
interface FeaturesCardProps {
  content: ContentInterface;
}

// Interface for feature list structure
interface ContentInterface {
  title: string;
  featuresList: FeatureList[];
}

interface FeatureList {
  id: number;
  title: string;
  icon: React.ReactNode;
}

// ✅ Use correct props type
export default function FeaturesCard({ content }: FeaturesCardProps) {
  return (
    <Card className="w-110 max-w-[500px] mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-[2px] rounded-2xl shadow-xl hover:shadow-2xl transition-all">
      <div className="bg-gray-900 bg-opacity-90 rounded-2xl p-5 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center my-1">
            {content.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {content.featuresList.map((item) => (
            <p key={item.id} className="flex items-center gap-3">
              {item.icon} {item.title}
            </p>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
