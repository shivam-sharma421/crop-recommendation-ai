import os
from dotenv import load_dotenv

load_dotenv()

# Verify that credentials were provided
username = os.environ.get('KAGGLE_USERNAME')
key = os.environ.get('KAGGLE_KEY')

if not username or not key or username == 'your_kaggle_username':
    print("Please set your Kaggle credentials in the .env file.")
    exit(1)

from kaggle.api.kaggle_api_extended import KaggleApi

print("Authenticating with Kaggle...")
api = KaggleApi()
api.authenticate()

print("Downloading dataset 'atharvaingle/crop-recommendation-dataset'...")
api.dataset_download_files('atharvaingle/crop-recommendation-dataset', path='data', unzip=True)
print("Download complete and unzipped to the 'data' directory.")
