export default function Reports({ data }) {
  const transactions = data?.transactions || [];
  const summary = data?.summary || {};

  const industryData = data?.industry_data || {};
  const cityData = data?.city_data || {};
  const investmentTypeData = data?.investment_type_data || {};
  const yearlyData = data?.yearly_data || {};

  const formatMoney = (amount) => {
    const value = Number(amount || 0);

    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }

    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }

    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }

    return `$${value.toLocaleString("en-US")}`;
  };

  const formatFullMoney = (amount) => {
    return `$${Number(amount || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2
    })}`;
  };

  const getTopItem = (obj) => {
    const entries = Object.entries(obj);

    if (entries.length === 0) {
      return {
        name: "N/A",
        amount: 0
      };
    }

    entries.sort((a, b) => Number(b[1]) - Number(a[1]));

    return {
      name: entries[0][0],
      amount: Number(entries[0][1])
    };
  };

  const getPercentage = (amount, total) => {
    if (!total) return 0;

    return Math.min(
      100,
      (Number(amount) / Number(total)) * 100
    );
  };

  const topIndustry = getTopItem(industryData);
  const topCity = getTopItem(cityData);
  const topInvestmentType = getTopItem(investmentTypeData);

  const industryEntries = Object.entries(industryData)
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const cityEntries = Object.entries(cityData)
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const investmentTypeEntries = Object.entries(investmentTypeData)
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const yearlyEntries = Object.entries(yearlyData)
    .sort((a, b) => Number(a[0]) - Number(b[0]));

  return (
    <div className="reports">

      {/* HEADER */}

      <div className="reports-header">
        <div>
          <h1>Financial Reports</h1>

          <p>
            A comprehensive overview of startup investments
            based on the historical finance dataset.
          </p>
        </div>

        <div className="report-badge">
          📊 Dataset Analytics
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="report-kpis">

        <div className="report-kpi">
          <div className="kpi-icon">💰</div>

          <div>
            <span>Total Investment</span>

            <h2>
              {formatMoney(summary.total_investment)}
            </h2>

            <small>
              Across all investment records
            </small>
          </div>
        </div>

        <div className="report-kpi">
          <div className="kpi-icon">📋</div>

          <div>
            <span>Total Transactions</span>

            <h2>
              {Number(
                summary.total_transactions || 0
              ).toLocaleString()}
            </h2>

            <small>
              Investment records
            </small>
          </div>
        </div>

        <div className="report-kpi">
          <div className="kpi-icon">📈</div>

          <div>
            <span>Average Investment</span>

            <h2>
              {formatMoney(summary.average_investment)}
            </h2>

            <small>
              Average amount per record
            </small>
          </div>
        </div>

        <div className="report-kpi">
          <div className="kpi-icon">🏆</div>

          <div>
            <span>Largest Investment</span>

            <h2>
              {formatMoney(summary.largest_investment)}
            </h2>

            <small>
              Highest recorded investment
            </small>
          </div>
        </div>

      </div>

      {/* OVERVIEW */}

      <div className="report-section">

        <div className="section-heading">
          <div>
            <h2>Dataset Overview</h2>
            <p>Key areas with the highest investment activity</p>
          </div>
        </div>

        <div className="overview-grid">

          <div className="overview-card">
            <div className="overview-top">
              <span>🏢</span>
              <small>Top Industry</small>
            </div>

            <h3>{topIndustry.name}</h3>

            <strong>
              {formatFullMoney(topIndustry.amount)}
            </strong>

            <div className="mini-progress">
              <div
                style={{
                  width: `${getPercentage(
                    topIndustry.amount,
                    summary.total_investment
                  )}%`
                }}
              ></div>
            </div>

            <p>
              {getPercentage(
                topIndustry.amount,
                summary.total_investment
              ).toFixed(1)}
              % of total investment
            </p>
          </div>

          <div className="overview-card">
            <div className="overview-top">
              <span>📍</span>
              <small>Top City</small>
            </div>

            <h3>{topCity.name}</h3>

            <strong>
              {formatFullMoney(topCity.amount)}
            </strong>

            <div className="mini-progress">
              <div
                style={{
                  width: `${getPercentage(
                    topCity.amount,
                    summary.total_investment
                  )}%`
                }}
              ></div>
            </div>

            <p>
              {getPercentage(
                topCity.amount,
                summary.total_investment
              ).toFixed(1)}
              % of total investment
            </p>
          </div>

          <div className="overview-card">
            <div className="overview-top">
              <span>💳</span>
              <small>Top Investment Type</small>
            </div>

            <h3>{topInvestmentType.name}</h3>

            <strong>
              {formatFullMoney(topInvestmentType.amount)}
            </strong>

            <div className="mini-progress">
              <div
                style={{
                  width: `${getPercentage(
                    topInvestmentType.amount,
                    summary.total_investment
                  )}%`
                }}
              ></div>
            </div>

            <p>
              {getPercentage(
                topInvestmentType.amount,
                summary.total_investment
              ).toFixed(1)}
              % of total investment
            </p>
          </div>

          <div className="overview-card">
            <div className="overview-top">
              <span>📅</span>
              <small>Data Period</small>
            </div>

            <h3>
              {yearlyEntries.length} Years
            </h3>

            <strong>
              {yearlyEntries.length > 0
                ? `${yearlyEntries[0][0]} – ${
                    yearlyEntries[yearlyEntries.length - 1][0]
                  }`
                : "N/A"}
            </strong>

            <p className="overview-description">
              Historical investment data available
            </p>
          </div>

        </div>
      </div>

      {/* YEARLY INVESTMENT */}

      <div className="report-section">

        <div className="section-heading">
          <div>
            <h2>Investment by Year</h2>
            <p>Annual investment distribution</p>
          </div>
        </div>

        <div className="year-grid">

          {yearlyEntries.map(([year, amount]) => (
            <div
              className="year-card"
              key={year}
            >
              <div className="year-card-top">
                <span>{year}</span>
                <span>📅</span>
              </div>

              <h3>
                {formatMoney(amount)}
              </h3>

              <div className="year-bar">
                <div
                  style={{
                    width: `${getPercentage(
                      amount,
                      Math.max(
                        ...Object.values(yearlyData)
                      )
                    )}%`
                  }}
                ></div>
              </div>

              <small>
                {formatFullMoney(amount)}
              </small>
            </div>
          ))}

        </div>
      </div>

      {/* INDUSTRY */}

      <div className="report-section">

        <div className="section-heading">
          <div>
            <h2>Investment by Industry</h2>
            <p>
              Top industries ranked by total investment
            </p>
          </div>
        </div>

        <div className="ranking-list">

          {industryEntries.map(
            ([industry, amount], index) => (
              <div
                className="ranking-item"
                key={industry}
              >
                <div className="rank-number">
                  {index + 1}
                </div>

                <div className="ranking-content">

                  <div className="ranking-label">
                    <span>{industry}</span>

                    <strong>
                      {formatMoney(amount)}
                    </strong>
                  </div>

                  <div className="ranking-bar">
                    <div
                      style={{
                        width: `${getPercentage(
                          amount,
                          topIndustry.amount
                        )}%`
                      }}
                    ></div>
                  </div>

                </div>
              </div>
            )
          )}

        </div>
      </div>

      {/* CITY + INVESTMENT TYPE */}

      <div className="report-two-column">

        {/* CITY */}

        <div className="report-section">

          <div className="section-heading">
            <div>
              <h2>Top Cities</h2>
              <p>Investment distribution by city</p>
            </div>
          </div>

          <div className="simple-list">

            {cityEntries.map(
              ([city, amount], index) => (
                <div
                  className="simple-list-item"
                  key={city}
                >
                  <div className="list-left">
                    <span className="list-number">
                      {index + 1}
                    </span>

                    <span>{city}</span>
                  </div>

                  <strong>
                    {formatMoney(amount)}
                  </strong>
                </div>
              )
            )}

          </div>

        </div>

        {/* INVESTMENT TYPE */}

        <div className="report-section">

          <div className="section-heading">
            <div>
              <h2>Investment Types</h2>
              <p>Funding type distribution</p>
            </div>
          </div>

          <div className="simple-list">

            {investmentTypeEntries.map(
              ([type, amount], index) => (
                <div
                  className="simple-list-item"
                  key={type}
                >
                  <div className="list-left">
                    <span className="list-number">
                      {index + 1}
                    </span>

                    <span>{type}</span>
                  </div>

                  <strong>
                    {formatMoney(amount)}
                  </strong>
                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* DATASET FOOTER */}

      <div className="dataset-footer">

        <div>
          <h3>Dataset Summary</h3>

          <p>
            This report is generated from{" "}
            <strong>
              {transactions.length.toLocaleString()}
            </strong>{" "}
            historical startup investment records.
          </p>
        </div>

        <div className="dataset-stat">
          <span>Records</span>
          <strong>
            {transactions.length.toLocaleString()}
          </strong>
        </div>

        <div className="dataset-stat">
          <span>Years</span>
          <strong>
            {yearlyEntries.length}
          </strong>
        </div>

      </div>

    </div>
  );
}