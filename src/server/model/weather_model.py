import sys
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.multioutput import MultiOutputClassifier

sys.path.insert(0, str(Path(__file__).parent.parent))
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'
OUTPUTS_DIR = BASE_DIR / 'outputs'
from scripts.get_weather import get_weather
from utils.consts import TARGET_COLS, FEATURE_COLS


# Loading datasets 
df_clothes = pd.read_json(DATA_DIR / 'clothes_cleaned.json')
df = pd.read_csv( DATA_DIR / "historical_weather_labelled.csv")

def predict_clothes():
    X = df[FEATURE_COLS]
    y = df[TARGET_COLS]

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

    # Train the multi-output model
    model = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10, min_samples_leaf=5))
    model.fit(X_train, y_train)

    # Predict on test rows
    y_pred_test = model.predict(X_test)

    # Evaluating accuracy per row, for multi-output
    print('\n Accuracy: ')
    for i, col in enumerate(TARGET_COLS):
        acc = accuracy_score(y_test.iloc[:, i], y_pred_test[:, i])
        print(f"{col:10} {acc:.2f}")

    # Predict on training rows
    y_pred_train = model.predict(X_train)

    # Compare train vs test accuracy
    print("\n Train vs test accuracy:")
    for i, col in enumerate(TARGET_COLS):
        train_acc = accuracy_score(y_train.iloc[:, i], y_pred_train[:, i])
        test_acc  = accuracy_score(y_test.iloc[:, i],  y_pred_test[:, i])
        print(f"{col:10} train={train_acc:.2f}  test={test_acc:.2f}")
  
    # Get current weather from api
    current_weather = get_weather("current")
    # Predict on real current weather
    prediction = model.predict(current_weather)

    predicted_outfit = dict(zip(TARGET_COLS, prediction[0]))
  
    # Look up name of clothes from id
    id_to_name = df_clothes.set_index('id')['name'].to_dict()

    # Print prediction
    print("\n What to wear today?")
    for layer, item_id in predicted_outfit.items():
        name = id_to_name.get(item_id, 'nothing')
        print(f"{layer:10} {name}")