# from authenticator import authenticator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users 
import os 

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    os.environ.get("CORS_HOST", "REACT_APP_USERS_API_HOST"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
# app.include_router(authenticator.router)
