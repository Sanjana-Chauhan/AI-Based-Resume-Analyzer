import fitz  # PyMuPDF for PDFs
import docx  # python-docx for DOCX files
from io import BytesIO
from fastapi import FastAPI, File, UploadFile
import numpy as np
from transformers import pipeline

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API Key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Google Gemini API
genai.configure(api_key=GEMINI_API_KEY)

def analyze_resume(resume_text):
    model = genai.GenerativeModel("gemini-pro")  # Use Gemini-Pro model
    response = model.generate_content(f"Analyze this resume and provide feedback: {resume_text}")
    
    return response.text




# Load the Named Entity Recognition (NER) model
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")

def analyze_resume_text(text):
    """Extract named entities (NER) from resume text."""
    try:
        entities = ner_pipeline(text)
        # Convert NumPy float32 to Python float
        for entity in entities:
            if isinstance(entity["score"], np.float32):
                entity["score"] = float(entity["score"])
        return entities
    except Exception as e:
        return f"Error in NER processing: {e}"

app = FastAPI()

def extract_text_from_pdf(pdf_bytes):
    """Extract text from a PDF file."""
    text = ""
    try:
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text("text") + "\n"
    except Exception as e:
        return f"Error extracting text from PDF: {e}"
    return text.strip()

def extract_text_from_docx(docx_bytes):
    """Extract text from a DOCX file."""
    text = ""
    try:
        doc = docx.Document(BytesIO(docx_bytes))
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        return f"Error extracting text from DOCX: {e}"
    return text.strip()

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    """Extract text from uploaded file, analyze it using NER & OpenAI."""
    contents = await file.read()
    file_type = file.filename.split(".")[-1].lower()

    if file_type == "pdf":
        extracted_text = extract_text_from_pdf(contents)
    elif file_type in ["doc", "docx"]:
        extracted_text = extract_text_from_docx(contents)
    else:
        return {"error": "Unsupported file format"}

    if not extracted_text:
        return {"error": "Failed to extract text from the file"}

    # Named Entity Recognition (NER) Analysis
    # ner_results = analyze_resume_text(extracted_text)

    # OpenAI Resume Analysis
    analysis_result = analyze_resume(extracted_text)

    return {
        "filename": file.filename,
        "extracted_text": extracted_text,
        # "entities": ner_results,
        "ai_analysis": analysis_result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
