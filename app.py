from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Crop Recommendation API")

# Load our trained model
try:
    model = joblib.load("crop_model.joblib")
except Exception as e:
    model = None
    print(f"Warning: Could not load model. Ensure train_model.py is run. Error: {e}")

# Define the input payload structure
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/predict")
def predict_crop(data: CropInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded on the server.")
    
    # Format exactly as the training data columns
    features = pd.DataFrame([{
        'N': data.N,
        'P': data.P,
        'K': data.K,
        'temperature': data.temperature,
        'humidity': data.humidity,
        'ph': data.ph,
        'rainfall': data.rainfall
    }])
    
    prediction = model.predict(features)
    
    return {"recommended_crop": prediction[0]}

# Mount the static directory to serve the frontend
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_index():
    return FileResponse("static/index.html")
