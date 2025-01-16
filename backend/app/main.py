import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.task import router as task_router
from .database import Base, engine
from dotenv import load_dotenv

load_dotenv()

# Инициализация базы данных
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-do API",
    description="API сервиса списка задач",
    version="1.0.0",
    root_path="/api"
)

origins = os.getenv("ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)
