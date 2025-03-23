"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Upload() {
  const router = useRouter();
  const [File, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Allowed file types and size
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword", // Support for .doc files
  ];
  const MAX_FILE_SIZE_MB = 5;

  // Handle file change and validate format and size
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Check file type
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("❌ Invalid file type. Please upload a PDF or DOC/DOCX.");
        return;
      }

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`❌ File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
        return;
      }

      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!File) {
      alert("⚠️ Please upload a valid resume.");
      return;
    }

    const formdata = new FormData();
    formdata.append("file", File);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8002/upload-resume", {
        method: "POST",
        body: formdata,
      });

      if (response.ok) {
        // Inside handleSubmit function after response.json()
        const data = await response.json();

        if (data) {
          // Store feedback safely after checking
         
          localStorage.setItem("feedbackData", JSON.stringify(data.feedback));
          router.push("/result");
        } else {
          alert("❌ Invalid data received. Please try again.");
        }
      }
    } catch (error) {
      console.error("❗️ Error uploading resume:", error);
      alert("⚠️ Error processing the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 sm:p-12 items-center justify-center min-h-screen ml-64">
      <Card className="w-full sm:w-110 max-w-[500px] border-2 border-gray-900 min-h-65 max-h-140 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Upload Resume</CardTitle>
          <CardDescription>
            Resume should be in PDF, DOC, or DOCX format (Max:{" "}
            {MAX_FILE_SIZE_MB} MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full border-gray-400 border-dashed border-2 p-3 h-40 rounded-lg flex flex-col">
            <label
              htmlFor="UploadResume"
              className="h-full flex flex-col items-center justify-evenly cursor-pointer"
            >
              <img src="/outbox.png" alt="upload" className="w-10 h-10" />
              {!File && (
                <p className="text-center text-sm text-gray-900/50">
                  Drop your resume here to get a personalized review
                </p>
              )}
              {File && (
                <p className="text-center text-sm text-gray-900/50">
                  📄 {File.name.split("\\").pop()}
                </p>
              )}
            </label>
            <input
              type="file"
              id="UploadResume"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gray-800 hover:bg-gray-900"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "⏳ Analyzing..." : "📤 Upload"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
