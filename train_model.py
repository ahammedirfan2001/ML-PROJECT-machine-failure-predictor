import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
data = pd.read_csv("ai4i2020.csv")

# Drop unnecessary columns
data = data.drop(["UDI", "Product ID"], axis=1)

# Convert categorical columns
data = pd.get_dummies(data, drop_first=True)

# Split features and target
X = data.drop("Machine failure", axis=1)
y = data["Machine failure"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(class_weight="balanced")
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "model.pkl")
joblib.dump(X.columns.tolist(), "columns.pkl")
print(X.columns)

print("✅ Model trained successfully!")
from sklearn.metrics import accuracy_score, confusion_matrix

# Predictions
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print("Accuracy:", acc)

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:\n", cm)

from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

# Predictions
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)

# Save accuracy
joblib.dump(acc, "accuracy.pkl")

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)

# Save confusion matrix
joblib.dump(cm, "cm.pkl")

print("Accuracy:", acc)
print("Confusion Matrix:\n", cm)