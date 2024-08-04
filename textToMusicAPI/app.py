from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from model import Helper
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class DataModel(BaseModel):
    inputs: List[str]
    seconds: float
    cfg: float

@app.post("/api/data")
async def post_data(data: DataModel):
    try:
        Helper.process(data.inputs, data.seconds, data.cfg)
        return {"received": data.dict()}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)