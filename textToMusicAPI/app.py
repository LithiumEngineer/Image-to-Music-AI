from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ValidationError
from test import Helper
from typing import List

app = FastAPI()

class DataModel(BaseModel):
    inputs: List[str]
    seconds: float
    temperature: float
    cfg: float
    use_sampling: bool
    top_k: int
    top_p: float


@app.post("/api/data")
async def post_data(data: DataModel):
    try:
        Helper.process(data.inputs)  # Call the process method from Helper
        return {"received": data.dict()}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)