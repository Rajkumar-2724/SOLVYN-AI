from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import APP_DESCRIPTION, APP_TITLE, APP_VERSION
from .routers import analyse, datasets

app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    description=APP_DESCRIPTION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyse.router)
app.include_router(datasets.router)


@app.get("/health", tags=["health"])
def health() -> dict:
    return {"status": "ok", "service": APP_TITLE, "version": APP_VERSION}