from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf
from ai import extract_jd_keywords, rewrite_resume_bullets, generate_cover_letter
from exporter import create_docx
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL:
    SUPABASE_URL = "https://wfoyeitrqcxsrlyihpnq.supabase.co"
if not SUPABASE_KEY:
    SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3llaXRycWN4c3JseWlocG5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyODU2NywiZXhwIjoyMDg5NDA0NTY3fQ.UB8_mzls0P558o1pCGE_u1RQ70cNoxUKjre2LIh6LZY"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

sb = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/")
def root():
    return {"status": "Job Copilot API is running"}

@app.post("/tailor")
async def tailor(
    jd_text: str = Form(...),
    tone: str = Form(...),
    candidate_name: str = Form(...),
    user_id: str = Form(None),
    resume_file: UploadFile = File(...)
):
    resume_bytes = await resume_file.read()
    resume_text = extract_text_from_pdf(resume_bytes)

    jd_keywords = extract_jd_keywords(jd_text)
    bullets = rewrite_resume_bullets(resume_text, jd_keywords)
    cover_letter = generate_cover_letter(resume_text, jd_text, tone)

    if user_id:
        try:
            sb.table("applications").insert({
                "user_id": user_id,
                "candidate_name": candidate_name,
                "job_description": jd_text[:500],
                "tone": tone
            }).execute()
        except Exception as e:
            print(f"Supabase insert error: {e}")

    docx_bytes = create_docx(bullets, cover_letter, candidate_name)

    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=tailored_{candidate_name}.docx"}
    )