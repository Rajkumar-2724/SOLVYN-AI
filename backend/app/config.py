from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "app" / "data"
UPLOAD_DIR = BASE_DIR / "uploads"

APP_TITLE = "Solvyn AI API"
APP_VERSION = "0.1.0"
APP_DESCRIPTION = (
    "Backend for the Solvyn AI coastal-armour monitoring platform. "
    "Provides wave-metre analysis, multi-stage image analysis (PRE/POST), "
    "and the public dataset registry."
)