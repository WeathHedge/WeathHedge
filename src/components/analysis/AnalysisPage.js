import React, { useState, useEffect } from "react";
import { Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement);

function AnalysisPage() {
  const [location, setLocation] = useState("london");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch data from the API

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?q=${location}&key=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const createPieData = () => {
    if (!weatherData) return null;

    const { current } = weatherData;

    return {
      labels: ["Temperature", "Wind Speed", "Humidity", "Pressure"],
      datasets: [
        {
          data: [
            current.temp_c,
            current.wind_kph,
            current.humidity,
            current.pressure_mb,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33FF99"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#33FF99"],
        },
      ],
    };
  };

  return (
    <div>
      <div>
        <div>Enter the location</div>
        <div>
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="graph-component">{weatherData && <Pie data={createPieData()} className="pie-graph" />}</div>
    </div>
  );
}

export default AnalysisPage;
