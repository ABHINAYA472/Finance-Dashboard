\# 💰 Finance Dashboard \& ML Investment Prediction



A full-stack finance analytics dashboard that visualizes historical startup investment data and uses a Machine Learning model to predict investment amounts.



\## 🚀 Features



\### 📊 Investment Dashboard

\- Total Investment

\- Total Transactions

\- Average Investment

\- Largest Investment

\- Investment trend by year

\- Investment distribution by industry

\- Top cities by investment



\### 📋 Transactions

\- View historical startup investment records

\- Startup name

\- Industry

\- SubVertical

\- City

\- Investors

\- Investment type

\- Investment amount

\- Date



\### 📑 Financial Reports

\- Dataset overview

\- Investment by year

\- Industry-wise investment analysis

\- City-wise investment analysis

\- Investment type distribution

\- Key financial statistics



\### 🤖 ML Investment Prediction

\- Random Forest Regression model

\- Industry-based prediction

\- SubVertical selection

\- City selection

\- Investment type selection

\- Year-based prediction

\- Dependent dropdown fields

\- Real-time prediction through Flask API



\## 🛠️ Tech Stack



\### Frontend

\- React

\- Vite

\- JavaScript

\- CSS

\- Chart.js

\- React Chart.js 2



\### Backend

\- Python

\- Flask

\- Flask-CORS

\- Pandas

\- NumPy

\- Scikit-learn

\- Joblib



\### Machine Learning

\- Random Forest Regression

\- Historical startup investment dataset

\- Features:

&#x20; - Industry

&#x20; - SubVertical

&#x20; - City

&#x20; - Investment Type

&#x20; - Year



\## 📁 Project Structure



```text

Finance-Dashboard/

│

├── backend/

│   ├── app.py

│   ├── train\_model.py

│   ├── Finance\_data.csv

│   ├── model.pkl

│   └── requirements.txt

│

├── src/

│   ├── components/

│   │   ├── Sidebar.jsx

│   │   ├── Header.jsx

│   │   ├── Cards.jsx

│   │   ├── Charts.jsx

│   │   ├── Table.jsx

│   │   ├── Insights.jsx

│   │   ├── Reports.jsx

│   │   └── MLPrediction.jsx

│   │

│   ├── App.jsx

│   ├── App.css

│   └── main.jsx

│

├── package.json

├── .gitignore

└── README.md

