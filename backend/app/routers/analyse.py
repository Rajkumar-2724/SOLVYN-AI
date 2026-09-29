from fastapi import APIRouter, File, UploadFile

from ..schemas import ImageAnalysisResponse, WaveAnalysisRequest, WaveAnalysisResponse
from ..services.image import analyse_image
from ..services.wave import analyse_wave

router = APIRouter(prefix="/api/analyse", tags=["analyse"])


@router.post("/wave", response_model=WaveAnalysisResponse)
def wave_analysis(req: WaveAnalysisRequest) -> dict:
    return analyse_wave(req)


@router.post("/image", response_model=ImageAnalysisResponse)
async def image_analysis(
    pre: UploadFile | None = File(None, description="PRE-Event image (jpg/jpeg/png/tiff)"),
    post: UploadFile | None = File(None, description="POST-Event image (jpg/jpeg/png/tiff)"),
) -> dict:
    if pre is None and post is None:
        from fastapi import HTTPException

        raise HTTPException(status_code=422, detail="At least one of 'pre' or 'post' is required")
    return await analyse_image(pre, post)