from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf
from ai import extract_jd_keywords, rewrite_resume_bullets, generate_cover_letter
from exporter import create_docx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Job Copilot API is running"}

@app.post("/tailor")
async def tailor(
    jd_text: str = Form(...),
    tone: str = Form(...),
    candidate_name: str = Form(...),
    resume_file: UploadFile = File(...)
):
    resume_bytes = await resume_file.read()
    resume_text = extract_text_from_pdf(resume_bytes)

    jd_keywords = extract_jd_keywords(jd_text)
    bullets = rewrite_resume_bullets(resume_text, jd_keywords)
    cover_letter = generate_cover_letter(resume_text, jd_text, tone)

    docx_bytes = create_docx(bullets, cover_letter, candidate_name)

    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=tailored_{candidate_name}.docx"}
    )