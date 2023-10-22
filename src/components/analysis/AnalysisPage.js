import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import "../../styles/analysis/Analysis.css";
import { ClipLoader } from "react-spinners";

function AnalysisPage() {
  const [location, setLocation] = useState("london");
  const [date, setDate] = useState("2023-10-01");
  const [weatherData, setWeatherData] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/history.json?q=${location}&key=${process.env.REACT_APP_API_KEY}&dt=${date}`
        );
        const data = await response.json();
        setWeatherData(data);
        setIsPageLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?q=${location}&key=${process.env.REACT_APP_API_KEY}&dt=${date}`
      );
      const data = await response.json();
      setWeatherData(data);
      setIsPageLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const createBarData = () => {
    if (!weatherData) return null;

    const { forecast } = weatherData;
    const firstForecastDay = forecast.forecastday[0];

    return {
      labels: ["Max Temp (°C)", "Min Temp (°C)", "Avg Temp (°C)"],
      datasets: [
        {
          data: [
            firstForecastDay.day.maxtemp_c,
            firstForecastDay.day.mintemp_c,
            firstForecastDay.day.avgtemp_c,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  };

  return (
    <div className="py-4">
      <div>
        <div className="py-2 analysis-title">Enter the location and date</div>
        <div className="py-2">
          <div className="pb-4">
            <input
              type="text"
              className="mx-2"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <input
              type="date"
              className="mx-2"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={fetchWeatherData} className="btn btn-primary">
              {" "}
              Click here
            </button>
          </div>
        </div>
      </div>
      <div className="graph-component pt-5 col-7 mx-auto">
        {isPageLoading ? (
          <div>
            <ClipLoader color="#000" />
          </div>
        ) : (
          weatherData && <Bar data={createBarData()} />
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;
