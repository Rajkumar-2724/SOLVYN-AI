import json

from fastapi import APIRouter

from ..config import DATA_DIR
from ..schemas import DatasetEntry

router = APIRouter(prefix="/api/datasets", tags=["datasets"])


def _load_registry() -> list[dict]:
    with (DATA_DIR / "dataset_registry.json").open("r", encoding="utf-8") as fh:
        return json.load(fh)


@router.get("", response_model=list[DatasetEntry])
def list_datasets() -> list[dict]:
    return _load_registry()


@router.get("/taxonomy")
def defect_taxonomy() -> dict:
    return {
        "labels": ["Crack", "Chip", "Fracture", "Breakage", "Missing unit", "Severe shape change"],
        "severities": ["Low", "Medium", "High", "Critical"],
        "note": "Fixed label set — detection only assigns from this taxonomy, never invents new classes.",
    }


@router.get("/workflow")
def annotation_workflow() -> dict:
    return {
        "steps": [
            "Upload PRE and POST imagery per zone",
            "Auto-detect armour units (48 stones in Zone 03)",
            "Match units across the event window via keypoints",
            "Review displacement/rotation deltas and defect labels",
            "Curator sign-off before registry publish",
        ],
        "publish": "Approved derived datasets are added to the shared registry for the next inspection cycle.",
    }