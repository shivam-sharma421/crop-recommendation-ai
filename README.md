# Crop Recommendation AI 🌾

An AI-powered web application that provides accurate crop recommendations based on soil parameters (N, P, K, pH) and environmental metrics (Temperature, Humidity, Rainfall). The application utilizes a Random Forest Classifier core exposed gracefully via a FastAPI backend, combined with a sleek, responsive React (CDN) glassmorphic interface.

## 🚀 Features

- **Machine Learning Core**: Scikit-Learn `RandomForestClassifier` trained perfectly on an expansive dataset to find exact patterns matching crop viability to climates.
- **Lightning API Framework**: FastAPI powered backend serving predictions swiftly via REST `/predict`.
- **Dynamic React Engine**: A single-page application built on raw React capabilities injected directly over CDN ensuring high-performance components natively.
- **Premium Design Aesthetics**: Full Dark Mode, layered Glassmorphism, CSS dynamic blobs, micro-interactions, and Google Fonts out of the box.

## ⚙️ Tech Stack

- **Backend:** Python 3, FastAPI, Uvicorn, Pandas, Scikit-learn
- **Frontend:** HTML5, CSS3, React (Babel Standalone CDN)
- **Data Pipeline:** Kaggle CLI integrated down-streaming

## 🛠️ Setup & Installation

Follow these quick steps to get the engine running securely on your machine locally. 

### 1. Configure Kaggle Credentials 
To fetch the dataset dynamically, you need to configure your Kaggle credentials. Open the `.env` file at the root of your project and insert your details:

```env
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_key
```

### 2. Install Requirements
Create a virtual environment (optional but recommended) and install the python backend dependencies:
```bash
pip install -r requirements.txt
```

### 3. Initialize Model and Data Pipeline
Pull data securely from Kaggle and train the inference core:

```bash
# Downloads atharvaingle/crop-recommendation-dataset
python download_data.py

# Trains and builds crop_model.joblib
python train_model.py
```

### 4. Boot the Visualizer API
Start the FastAPI live ASGI webserver:
```bash
uvicorn app:app --port 8000
```
Then navigate to **http://localhost:8000** in your browser!
