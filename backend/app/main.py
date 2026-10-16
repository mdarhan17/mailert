from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mailert API",
    description="AI-Powered Email Scam and Phishing Detection",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {
        "application": "Mailert",
        "tagline": "Think Before You Click.",
        "message": "Mailert backend is running"
    }

@app.get("/api/health")
def health():
    return {
        "status": "success",
        "backend": "running"
    }
