# ⚙️ Machine Failure Prediction System

An AI-powered web application that predicts machine failure risk using **Machine Learning + real-time input analysis**, with an interactive dashboard and visual insights.

---

## 🚀 Features

* 🔮 Predict machine failure using **Random Forest model**
* 📊 Risk classification:

  * 🟢 Low Risk
  * 🟠 Medium Risk
  * 🔴 High Risk
* 🧠 Hybrid logic (ML + rule-based thresholds)
* 📉 Interactive charts:

  * Doughnut chart (risk distribution)
  * Bar chart (input parameters)
* ⚠️ Displays **failure reasons** (Torque, Wear, Overheating)
* 🎨 Modern UI with animations, glow effects, and dynamic feedback

---

## 🧠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Flask (Python)
* **Machine Learning:** Random Forest (Scikit-learn)
* **Visualization:** Chart.js

---

## 📂 Project Structure

```
ML-PROJECT-machine-failure-predictor/
│
├── app.py
├── model.pkl
├── columns.pkl
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
```

---

## ⚙️ How It Works

1. User enters machine parameters:

   * Air Temperature
   * Process Temperature
   * Rotational Speed
   * Torque
   * Tool Wear

2. Backend processes input and:

   * Uses ML model to predict probability
   * Applies rule-based thresholds for reliability

3. System outputs:

   * Risk level
   * Probability (%)
   * Failure reasons
   * Visual charts

---

## 📸 Demo

> Add screenshots here (very important for portfolio)

---

## 🛠️ Installation & Run Locally

```bash
git clone https://github.com/ahammedirfan2001/ML-PROJECT-machine-failure-predictor.git
cd ML-PROJECT-machine-failure-predictor

pip install -r requirements.txt
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 🌐 Deployment

You can deploy this project using platforms like:

* Render
* Railway

---

## 💡 Key Highlights

* Combines **Machine Learning + Domain Logic**
* Handles **low-probability edge cases effectively**
* Provides **interpretable AI output**
* Designed for **real-world industrial use**

---

## 📌 Future Improvements

* 📈 Live monitoring dashboard
* 📊 Feature importance visualization
* 🌐 Cloud deployment with API access

---

## 👨‍💻 Author

**Ahammed Irfan N P**
B.Tech CSE | Machine Learning Enthusiast

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
