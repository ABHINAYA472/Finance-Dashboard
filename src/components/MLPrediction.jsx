import { useEffect, useState } from "react";

export default function MLPrediction() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    industry: "",
    subvertical: "",
    city: "",
    investment_type: "",
    year: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/filtered-options")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }

        return response.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError(result.error || "Invalid data received");
        }

        setDataLoading(false);
      })
      .catch(() => {
        setError(
          "Cannot connect to ML backend. Make sure Flask is running."
        );

        setDataLoading(false);
      });
  }, []);

  const industries = [
    ...new Set(
      data.map((item) => item.industry).filter(Boolean)
    )
  ].sort();

  const subverticals = [
    ...new Set(
      data
        .filter((item) => item.industry === form.industry)
        .map((item) => item.subvertical)
        .filter(Boolean)
    )
  ].sort();

  const cities = [
    ...new Set(
      data
        .filter(
          (item) =>
            item.industry === form.industry &&
            item.subvertical === form.subvertical
        )
        .map((item) => item.city)
        .filter(Boolean)
    )
  ].sort();

  const investmentTypes = [
    ...new Set(
      data
        .filter(
          (item) =>
            item.industry === form.industry &&
            item.subvertical === form.subvertical &&
            item.city === form.city
        )
        .map((item) => item.investment_type)
        .filter(Boolean)
    )
  ].sort();

  const handleIndustryChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      industry: value,
      subvertical: "",
      city: "",
      investment_type: ""
    }));

    setPrediction(null);
    setError("");
  };

  const handleSubVerticalChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      subvertical: value,
      city: "",
      investment_type: ""
    }));

    setPrediction(null);
    setError("");
  };

  const handleCityChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      city: value,
      investment_type: ""
    }));

    setPrediction(null);
    setError("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    setPrediction(null);
    setError("");
  };

  const predictAmount = async () => {
    setPrediction(null);
    setError("");

    if (
      !form.industry ||
      !form.subvertical ||
      !form.city ||
      !form.investment_type ||
      !form.year
    ) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Prediction failed");
        return;
      }

      setPrediction(result.prediction);
    } catch (err) {
      setError(
        "Cannot connect to ML backend. Make sure Flask is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setForm({
      industry: "",
      subvertical: "",
      city: "",
      investment_type: "",
      year: ""
    });

    setPrediction(null);
    setError("");
  };

  if (dataLoading) {
    return (
      <div className="ml-page">
        <div className="ml-card">
          <p>Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-page">
      <div className="ml-card">

        <div className="ml-header">
          <div className="ml-icon">🤖</div>

          <div>
            <h1>Finance ML Prediction</h1>
            <p>
              Estimate investment amounts using historical
              financial data and machine learning.
            </p>
          </div>
        </div>

        <div className="ml-form">

          <div className="ml-input">
            <label>Industry</label>

            <select
              value={form.industry}
              onChange={handleIndustryChange}
            >
              <option value="">Select Industry</option>

              {industries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-input">
            <label>SubVertical</label>

            <select
              value={form.subvertical}
              onChange={handleSubVerticalChange}
              disabled={!form.industry}
            >
              <option value="">
                {!form.industry
                  ? "Select Industry First"
                  : "Select SubVertical"}
              </option>

              {subverticals.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-input">
            <label>City</label>

            <select
              value={form.city}
              onChange={handleCityChange}
              disabled={!form.subvertical}
            >
              <option value="">
                {!form.subvertical
                  ? "Select SubVertical First"
                  : "Select City"}
              </option>

              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-input">
            <label>Investment Type</label>

            <select
              name="investment_type"
              value={form.investment_type}
              onChange={handleChange}
              disabled={!form.city}
            >
              <option value="">
                {!form.city
                  ? "Select City First"
                  : "Select Investment Type"}
              </option>

              {investmentTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-input">
            <label>Year</label>

            <input
              type="number"
              name="year"
              placeholder="Example: 2017"
              value={form.year}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="ml-buttons">
          <button
            className="ml-predict"
            onClick={predictAmount}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Investment"}
          </button>

          <button
            className="ml-clear"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>

        {prediction !== null && (
          <div className="ml-result">
            <span>💰</span>
            <p>Predicted Investment Amount</p>

            <h2>
              ₹{Number(prediction).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </h2>

            <small>
              Prediction generated by the Random Forest ML model
            </small>
          </div>
        )}

        {error && (
          <div className="ml-error">
            ⚠️ {error}
          </div>
        )}

        <div className="ml-info">
          <h3>How it works</h3>

          <p>
            The system uses Industry, SubVertical, City,
            Investment Type and Year as input features.
            A trained Random Forest regression model estimates
            the investment amount.
          </p>
        </div>

      </div>
    </div>
  );
}