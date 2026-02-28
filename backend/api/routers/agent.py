from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any

from backend.db.session import get_db
from backend.services.agent_service import agent_service
from backend.db.models import ActionLog, User

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    chat_history: List[List[str]] = [] # [ ["human", "hi"], ["ai", "hello"] ]

class ChatResponse(BaseModel):
    response: str

# Dummy auth dependency again, reuse from simple version or just assume user 1
def get_current_user(db: Session = Depends(get_db)):
    user = db.query(User).first()
    return user

@router.post("/chat", response_model=ChatResponse)
def chat_with_agent(
    req: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Chat with the business AI assistant.
    """
    ai_response = agent_service.invoke(req.query, req.chat_history)
    
    # Log Action
    if current_user:
        log = ActionLog(
            action_type="agent_action",
            details=f"Query: {req.query}",
            user_id=current_user.id
        )
        db.add(log)
        db.commit()

    return {"response": ai_response}
