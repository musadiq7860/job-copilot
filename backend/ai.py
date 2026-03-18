import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_jd_keywords(jd_text: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an ATS expert. Extract required skills, responsibilities, and seniority from job descriptions. Be concise and structured."
            },
            {
                "role": "user",
                "content": f"Extract key skills and requirements from this job description:\n\n{jd_text}"
            }
        ]
    )
    return response.choices[0].message.content


def rewrite_resume_bullets(resume_text: str, jd_keywords: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert resume writer. Rewrite resume bullet points to match job requirements naturally. Keep bullets under 20 words. Use strong action verbs. Do not invent skills the candidate does not have."
            },
            {
                "role": "user",
                "content": f"Job requires:\n{jd_keywords}\n\nResume content:\n{resume_text}\n\nRewrite the resume bullets to match the job requirements."
            }
        ]
    )
    return response.choices[0].message.content


def generate_cover_letter(resume_text: str, jd_text: str, tone: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": f"You are an expert cover letter writer. Write in a {tone} tone. Write exactly 3 paragraphs. Do not use cliches like 'I hope this finds you well'. Be direct and compelling."
            },
            {
                "role": "user",
                "content": f"Job Description:\n{jd_text}\n\nCandidate Resume:\n{resume_text}\n\nWrite a tailored cover letter."
            }
        ]
    )
    return response.choices[0].message.content