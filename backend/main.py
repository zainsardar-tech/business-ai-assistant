from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings

from backend.api.routers import auth, agent, documents, analytics

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only. Should be configured properly in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(agent.router, prefix="/api/v1/agent", tags=["agent"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])

@app.get("/")
def root():
    return {
        "message": "Welcome to Business AI Assistant API",
        "docs": f"/docs"
    }
