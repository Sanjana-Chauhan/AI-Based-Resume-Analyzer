from fastapi import File, UploadFile, HTTPException
from PyPDF2 import PdfReader
from groq import Groq
import os
from dotenv import load_dotenv
load_dotenv()

groq_client =Groq(api_key=os.getenv("GROQ_API_KEY"))

def root():
    return{"message":"Welcome to resumeIq Backend"}

def health_check():
    return {"status":"OK"}


def extract_text_from_pdf(pdf_file):
    pdf_reader = PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text.strip()


def load_prompt_from_file(file_path: str):
    with open(file_path, "r") as file:
        return file.read()

async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    resume_text = extract_text_from_pdf(file.file)
    
    if not resume_text:
        raise HTTPException(status_code=400, detail="Failed to extract text from PDF.")
    
    prompt_template = load_prompt_from_file("api/prompt.txt")
    prompt = f"{prompt_template}\n\nResume Content:\n{resume_text}"
    
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=1000,
    )

    analysis_result = response.choices[0].message.content.strip()

    return {"feedback": analysis_result}
