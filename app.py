from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model and columns
model = joblib.load("model.pkl")
columns = joblib.load("columns.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Create input dictionary
    input_dict = {
        "Air temperature [K]": float(data["air"]),
        "Process temperature [K]": float(data["process"]),
        "Rotational speed [rpm]": float(data["speed"]),
        "Torque [Nm]": float(data["torque"]),
        "Tool wear [min]": float(data["wear"])
    }

    # Convert to DataFrame
    input_df = pd.DataFrame([input_dict])

    # Match training columns
    input_df = input_df.reindex(columns=columns, fill_value=0)

    # Predict probability
    prob = model.predict_proba(input_df)[0][1]

    reasons = []

    if float(data["torque"]) > 70:
        reasons.append("High Torque")

    if float(data["wear"]) > 200:
        reasons.append("High Tool Wear")

    if float(data["process"]) > float(data["air"]) + 20:
         reasons.append("Overheating")

    torque = float(data["torque"])
    wear = float(data["wear"])

    if prob > 0.3 or torque > 85 or wear > 300:
        result = "🔴 High Risk (Failure Likely)"
    elif prob > 0.1:
        result = "🟠 Medium Risk"
    else:
        result = "🟢 Low Risk (Safe)"

    importances = model.feature_importances_

    feature_names = columns[:5]  # first 5 = your inputs

    importance_data = dict(zip(feature_names, importances))

    return jsonify({
        "probability": prob,
        "result": result,
        "reasons": reasons,
        "importance": importance_data
    })

if __name__ == "__main__":
    app.run(debug=True)