# JobCopilot — AI-Powered Job Application Tailoring

> Stop sending generic applications. Start getting hired.

**Live Demo:** https://job-copilot-cyan.vercel.app

JobCopilot is a full-stack AI web app that takes your resume PDF and a job description, then rewrites your resume bullets to match the job's ATS keywords and generates a tailored cover letter — all in under 60 seconds.

---

## Features

- Upload resume PDF + paste job description
- AI extracts ATS keywords from the job description
- Rewrites your resume bullets to match naturally — using your real projects by name
- Generates a 3-paragraph tailored cover letter
- Downloads a formatted DOCX file instantly
- User auth with Supabase (login / signup)
- Dashboard with application history and stats
- Tone selector: Professional / Technical / Casual

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, Inline Styles |
| Backend | FastAPI, Python 3.11 |
| AI | Groq API — llama-3.3-70b-versatile |
| Auth + DB | Supabase |
| PDF Parsing | PyMuPDF (fitz) |
| DOCX Export | python-docx |
| Frontend Deploy | Vercel |
| Backend Deploy | HuggingFace Spaces (Docker) |

---

## Project Structure
```
job-copilot/
├── backend/
│   ├── main.py          # FastAPI app — POST /tailor endpoint
│   ├── parser.py        # PyMuPDF PDF text extraction
│   ├── ai.py            # Groq llama-3.3-70b prompt chains
│   ├── exporter.py      # python-docx DOCX generation
│   ├── requirements.txt
│   └── Dockerfile       # HuggingFace Spaces deployment
│
└── frontend/
    ├── app/
    │   ├── page.tsx         # Landing page
    │   ├── auth/page.tsx    # Login + Signup
    │   ├── dashboard/page.tsx # Application history
    │   └── tool/page.tsx    # Main tailoring tool
    └── lib/
        └── supabase.ts      # Supabase client
```

---

## How It Works

1. User uploads resume PDF + pastes job description
2. FastAPI parses the PDF using PyMuPDF
3. Groq llama-3.3-70b extracts ATS keywords from the JD
4. Second Groq call rewrites resume bullets using candidate's real projects
5. Third Groq call generates a tailored cover letter
6. Output packaged as DOCX and returned for download
7. Application saved to Supabase for dashboard tracking

---

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:
```
GROQ_API_KEY=your_groq_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
```

Run:
```bash
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run:
```bash
npm run dev
```

---

## API

### POST /tailor

Accepts multipart form data:

| Field | Type | Description |
|---|---|---|
| resume_file | File | PDF resume |
| jd_text | string | Job description |
| candidate_name | string | User's name |
| tone | string | professional / technical / casual |
| user_id | string | Supabase user ID (optional) |

Returns: DOCX file download

---

## Deployment

- **Frontend:** Vercel — auto-deploys from GitHub main branch
- **Backend:** HuggingFace Spaces (Docker) — https://huggingface.co/spaces/musadiq7860/job-copilot-api

---

## Built By

**Mussadiq** — Pakistan
- GitHub: [@musadiq7860](https://github.com/musadiq7860)
- LinkedIn: [muhammad-musadiq](https://www.linkedin.com/in/muhammad-musadiq7860)
