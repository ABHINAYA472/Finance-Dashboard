from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")


@app.route("/")
def home():
    return jsonify({
        "message": "Finance ML API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        industry = data.get("industry")
        subvertical = data.get("subvertical")
        city = data.get("city")
        investment_type = data.get("investment_type")
        year = data.get("year")

        if not all([industry, subvertical, city, investment_type, year]):
            return jsonify({
                "error": "All fields are required"
            }), 400

        input_data = pd.DataFrame([{
            "Industry": industry,
            "SubVertical": subvertical,
            "City": city,
            "InvestmentType": investment_type,
            "Year": int(year)
        }])

        prediction = model.predict(input_data)[0]

        return jsonify({
            "prediction": round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/options")
def options():
    try:
        df = pd.read_csv("Finance_data.csv")

        df.columns = df.columns.str.strip()

        industries = (
            df["Industry Vertical"]
            .dropna()
            .astype(str)
            .str.strip()
            .unique()
            .tolist()
        )

        subverticals = (
            df["SubVertical"]
            .dropna()
            .astype(str)
            .str.strip()
            .unique()
            .tolist()
        )

        cities = (
            df["City  Location"]
            .dropna()
            .astype(str)
            .str.strip()
            .unique()
            .tolist()
        )

        investment_types = (
            df["InvestmentnType"]
            .dropna()
            .astype(str)
            .str.strip()
            .unique()
            .tolist()
        )

        return jsonify({
            "industries": sorted(industries),
            "subverticals": sorted(subverticals),
            "cities": sorted(cities),
            "investment_types": sorted(investment_types)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
@app.route("/filtered-options")
def filtered_options():
    try:
        df = pd.read_csv("Finance_data.csv")

        df.columns = df.columns.str.strip()

        df = df.rename(columns={
            "Industry Vertical": "industry",
            "SubVertical": "subvertical",
            "City  Location": "city",
            "InvestmentnType": "investment_type"
        })

        for column in [
            "industry",
            "subvertical",
            "city",
            "investment_type"
        ]:
            df[column] = (
                df[column]
                .dropna()
                .astype(str)
                .str.strip()
            )

        data = df[
            [
                "industry",
                "subvertical",
                "city",
                "investment_type"
            ]
        ].dropna().drop_duplicates()

        return jsonify(
            data.to_dict(orient="records")
        )

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
@app.route("/dashboard-data")
def dashboard_data():
    try:
        df = pd.read_csv("Finance_data.csv")

        df.columns = df.columns.str.strip()

        df = df.rename(columns={
            "Date dd/mm/yyyy": "date",
            "Startup Name": "startup",
            "Industry Vertical": "industry",
            "SubVertical": "subvertical",
            "City  Location": "city",
            "Investors Name": "investors",
            "InvestmentnType": "investment_type",
            "Amount in USD": "amount"
        })

        def clean_amount(value):
            if pd.isna(value):
                return None

            value = str(value).strip()
            value = value.replace(",", "")
            value = value.replace("$", "")
            value = value.replace("₹", "")

            try:
                return float(value)
            except:
                return None

        df["amount"] = df["amount"].apply(clean_amount)

        df["date"] = pd.to_datetime(
            df["date"],
            errors="coerce",
            dayfirst=True
        )

        df["year"] = df["date"].dt.year

        df = df.dropna(subset=["amount"])

        df["date"] = df["date"].dt.strftime("%Y-%m-%d")

        transactions = df[
            [
                "date",
                "startup",
                "industry",
                "subvertical",
                "city",
                "investors",
                "investment_type",
                "amount",
                "year"
            ]
        ].fillna("").to_dict(orient="records")

        total_investment = float(df["amount"].sum())

        industry_data = (
            df.groupby("industry")["amount"]
            .sum()
            .sort_values(ascending=False)
            .head(10)
        )

        city_data = (
            df.groupby("city")["amount"]
            .sum()
            .sort_values(ascending=False)
            .head(10)
        )

        investment_type_data = (
            df.groupby("investment_type")["amount"]
            .sum()
            .sort_values(ascending=False)
            .head(10)
        )

        yearly_data = (
            df.dropna(subset=["year"])
            .groupby("year")["amount"]
            .sum()
            .sort_index()
        )

        return jsonify({
            "transactions": transactions,
            "summary": {
                "total_investment": total_investment,
                "total_transactions": len(df),
                "average_investment": float(df["amount"].mean()),
                "largest_investment": float(df["amount"].max())
            },
            "industry_data": {
                str(k): float(v)
                for k, v in industry_data.items()
            },
            "city_data": {
                str(k): float(v)
                for k, v in city_data.items()
            },
            "investment_type_data": {
                str(k): float(v)
                for k, v in investment_type_data.items()
            },
            "yearly_data": {
                str(int(k)): float(v)
                for k, v in yearly_data.items()
            }
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
if __name__ == "__main__":
    app.run(debug=True, port=5000)