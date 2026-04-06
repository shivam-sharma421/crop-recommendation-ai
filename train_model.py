import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

def train():
    try:
        df = pd.read_csv('data/Crop_recommendation.csv')
    except FileNotFoundError:
        print("Dataset not found. Please run download_data.py first.")
        return

    # Features and labels
    X = df.drop('label', axis=1)
    y = df['label']

    print(f"Dataset loaded successfully with {len(df)} samples and {len(X.columns)} features.")

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    print("Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate model
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model accuracy on test set: {acc * 100:.2f}%")
    # print(classification_report(y_test, y_pred))

    # Save model
    joblib.dump(model, 'crop_model.joblib')
    print("Model saved to 'crop_model.joblib'.")

if __name__ == '__main__':
    train()
