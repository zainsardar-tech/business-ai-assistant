from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Any
import shutil
import os

from backend.db.session import get_db
from backend.db.models import Document, User

router = APIRouter()

# Setup dummy auth dependency
# In a real app we decode the JWT token.
def get_current_user(db: Session = Depends(get_db)):
    # Very basic placeholder: just get the first user or fail.
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=401, detail="No users exist in dev mode")
    return user

os.makedirs("data/uploads", exist_ok=True)

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Upload a document (PDF, CSV, TXT) and trigger vector indexing.
    """
    if not file.filename.endswith((".pdf", ".csv", ".txt")):
        raise HTTPException(status_code=400, detail="Only PDF, CSV, and TXT files are allowed.")
    
    file_location = f"data/uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Save immediately
    doc = Document(filename=file.filename, status="uploaded", user_id=current_user.id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    
    # Normally we'd queue background task here. For MVP we'll call logic synchronously later or fake it.
    
    return {"message": f"Successfully uploaded {file.filename}", "doc_id": doc.id}

@router.get("/")
def get_user_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    docs = db.query(Document).filter(Document.user_id == current_user.id).all()
    return [{"id": d.id, "filename": d.filename, "status": d.status} for d in docs]
