import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score


# Load dataset
df = pd.read_csv("Finance_data.csv")

print("Original dataset shape:", df.shape)

# Clean column names
df.columns = df.columns.str.strip()


# Rename columns
df = df.rename(columns={
    "Date dd/mm/yyyy": "Date",
    "Industry Vertical": "Industry",
    "SubVertical": "SubVertical",
    "City  Location": "City",
    "InvestmentnType": "InvestmentType",
    "Amount in USD": "Amount"
})


# Clean investment amount
def clean_amount(value):

    if pd.isna(value):
        return np.nan

    value = str(value).strip()

    value = value.replace(",", "")
    value = value.replace("$", "")
    value = value.replace("₹", "")

    try:
        return float(value)
    except:
        return np.nan


df["Amount"] = df["Amount"].apply(clean_amount)


# Convert date
df["Date"] = pd.to_datetime(
    df["Date"],
    errors="coerce",
    dayfirst=True
)

df["Year"] = df["Date"].dt.year


# Clean text columns
text_columns = [
    "Industry",
    "SubVertical",
    "City",
    "InvestmentType"
]

for column in text_columns:
    df[column] = (
        df[column]
        .astype(str)
        .str.strip()
        .replace("nan", np.nan)
    )


# Remove rows without target
df = df.dropna(subset=["Amount"])


print("After cleaning:", df.shape)


# Remove extreme outliers
upper_limit = df["Amount"].quantile(0.99)

df = df[
    df["Amount"] <= upper_limit
]


# Features
features = [
    "Industry",
    "SubVertical",
    "City",
    "InvestmentType",
    "Year"
]

X = df[features]
y = df["Amount"]


# Columns
categorical_features = [
    "Industry",
    "SubVertical",
    "City",
    "InvestmentType"
]

numerical_features = [
    "Year"
]


# Categorical preprocessing
categorical_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="most_frequent")
    ),
    (
        "encoder",
        OneHotEncoder(
            handle_unknown="ignore"
        )
    )
])


# Numerical preprocessing
numerical_pipeline = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    )
])


# Combine preprocessing
preprocessor = ColumnTransformer([
    (
        "categorical",
        categorical_pipeline,
        categorical_features
    ),
    (
        "numerical",
        numerical_pipeline,
        numerical_features
    )
])


# Random Forest
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)


# Complete ML pipeline
pipeline = Pipeline([
    (
        "preprocessor",
        preprocessor
    ),
    (
        "model",
        model
    )
])


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("Training model...")

pipeline.fit(
    X_train,
    y_train
)


# Prediction
predictions = pipeline.predict(
    X_test
)


# Evaluation
mae = mean_absolute_error(
    y_test,
    predictions
)

r2 = r2_score(
    y_test,
    predictions
)


print()
print("==============================")
print("MODEL TRAINING COMPLETED")
print("==============================")
print("Training records:", len(X_train))
print("Testing records:", len(X_test))
print("MAE:", mae)
print("R2 Score:", r2)


# Save model
joblib.dump(
    pipeline,
    "model.pkl"
)


print()
print("model.pkl created successfully!")