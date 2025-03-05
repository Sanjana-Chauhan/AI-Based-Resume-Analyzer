from fastapi import FastAPI, File, UploadFile
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()

# Enable CORS (Allow requests from your frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/analyze-resume")
async def analyze_resume(resume: UploadFile = File(...)):
    contents = await resume.read()
    # Placeholder for AI processing
    analysis_result = "AI Analysis: Resume is well-structured!"
    return {"analysis": analysis_result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
