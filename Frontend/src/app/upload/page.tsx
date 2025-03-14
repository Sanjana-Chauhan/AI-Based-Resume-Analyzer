"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post<{ entities: string }>(
        "http://localhost:8001/analyze-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data.entities);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error analyzing resume!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-zinc-200 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mb-4 border p-2 w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
        {result && <pre className="mt-4 bg-gray-200 p-4">{result}</pre>}
      </div>
    </div>
  );
}
