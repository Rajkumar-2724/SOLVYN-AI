from pydantic import BaseModel, Field


class WaveAnalysisRequest(BaseModel):
    height: float = Field(2.8, gt=0, le=30, description="Significant wave height in metres")
    period: float = Field(8.6, gt=0, le=60, description="Peak wave period in seconds")
    direction: float = Field(236, ge=0, le=360, description="Dominant wave direction in degrees")
    waterLevel: float = Field(1.2, ge=-5, le=30, description="Water level offset in metres")
    frequency: float = Field(0.116, gt=0, le=10, description="Wave frequency in Hz")


class WaveAnalysisResponse(BaseModel):
    status: str
    height: float
    period: float
    direction: float
    directionLabel: str
    energy: float
    waterLevel: float
    frequency: float
    stability: int
    riskLevel: str
    alerts: list[str]
    generatedAt: str


class DisplacementRow(BaseModel):
    id: str
    preX: float
    preY: float
    postX: float
    postY: float
    dX: float
    dY: float
    displacement: float
    rotation: float
    severity: str
    matched: bool


class DefectRow(BaseModel):
    unit: str
    type: str
    severity: str
    confidence: float
    area: float


class DataRow(BaseModel):
    metric: str
    pre: str
    post: str
    change: str


class PipelineStage(BaseModel):
    name: str
    status: str
    detail: str


class ImageAnalysisResponse(BaseModel):
    status: str
    meta: dict
    pipeline: list[PipelineStage]
    displacement: list[DisplacementRow]
    defects: list[DefectRow]
    data: list[DataRow]
    summary: dict


class DatasetEntry(BaseModel):
    id: str
    name: str
    region: str
    type: str
    url: str
    priority: str
    useCases: list[str]
    formats: list[str]
    notes: str