from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from model import Helper
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataModel(BaseModel):
    inputs: List[str]
    seconds: float
    cfg: float

@app.post("/api/data")
async def post_data(data: DataModel):
    try:
        audio_base64 = Helper.process(data.inputs, data.seconds, data.cfg)
        return {"audio_base64": audio_base64}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)