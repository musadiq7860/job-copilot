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
                "content": """You are an expert resume writer. Rewrite the candidate's actual experience into strong resume bullets that naturally align with the job.

Rules:
- Only use skills and projects the candidate ACTUALLY has in their resume
- Mention their real projects by name where they are relevant
- Sound natural and human — not like a keyword list
- Start every bullet with a strong action verb
- Keep each bullet under 20 words
- Do NOT invent anything not in the resume
- Do NOT just copy job requirements as bullets"""
            },
            {
                "role": "user",
                "content": f"""Candidate resume:
{resume_text}

Job requirements:
{jd_keywords}

Rewrite the candidate's real experience as strong resume bullets that highlight relevant skills and mention actual projects by name."""
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
                "content": f"""You are an expert cover letter writer. Write in a {tone} tone.

Rules:
- Write exactly 3 paragraphs
- Reference the candidate's REAL projects from their resume by name
- Sound like a real human wrote this — confident and natural
- Never use cliches like 'I hope this finds you well' or 'I am writing to express my interest'
- Paragraph 1: who they are and why they are a strong fit for this specific role
- Paragraph 2: mention 2 specific real projects from their resume that match the job
- Paragraph 3: excitement about the role and a clear next step CTA"""
            },
            {
                "role": "user",
                "content": f"""Candidate resume:
{resume_text}

Job description:
{jd_text}

Write a natural, confident cover letter that references the candidate's real projects by name."""
            }
        ]
    )
    return response.choices[0].message.content