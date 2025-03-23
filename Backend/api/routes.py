from fastapi import APIRouter
from .endpoints import root,health_check,upload_resume
app_router=APIRouter()

app_router.get("/")(root)

app_router.get("/health")(health_check)

app_router.post("/upload-resume/")(upload_resume)
