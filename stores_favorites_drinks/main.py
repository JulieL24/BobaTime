from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os 
from routers import stores

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
    os.environ.get("CORS_HOST", "REACT_APP_STORES_FAVORITES_DRINKS_API_HOST"),
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stores.router)
