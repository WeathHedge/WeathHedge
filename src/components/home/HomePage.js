import React, { useEffect, useRef } from "react";
import hero from "../../assets/hero-img3.png";
import "../../styles/home/Home.css";
import { Chart } from "chart.js";

function HomePage() {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    const multiply = {
      beforeDatasetsDraw: (chart, options, el) => {
        chart.ctx.globalCompositeOperation = "multiply";
      },
      afterDatasetsDraw: (chart, options) => {
        chart.ctx.globalCompositeOperation = "source-over";
      },
    };

    const gradientThisWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, "#5555FF");
    gradientThisWeek.addColorStop(1, "#9787FF");

    const gradientPrevWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, "#FF55B8");
    gradientPrevWeek.addColorStop(1, "#FF8787");

    const config = {
      type: "line",
      data: {
        labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"],
        datasets: [
          {
            label: "Temperature",
            data: [18, 26, 14, 22, 12, 20, 12, 18, 10],
            fill: false,
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: "transparent",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 3,
            pointHoverBorderColor: "rgba(255, 255, 255, 0.2)",
            pointHoverBorderWidth: 10,
            lineTension: 0,
          },
        ],
      },
      options: {
        responsive: false,
        elements: {
          point: {
            radius: 6,
            hitRadius: 6,
            hoverRadius: 6,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "transparent",
            bodyFontSize: 14,
            callbacks: {
              label: (context) => {
                return context.parsed.y + "°C";
              },
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
        plugins: {
          beforeDraw: (chart) => {
            chart.clear();
          },
          afterDraw: (chart) => {
            chart.destroy();
          },
          plugin: [multiply],
        },
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div>
        <div className="card col-6">
          <div className="about">
            <p className="lead">Temperature in °C</p>
          </div>

          <canvas ref={chartRef} id="canvas"></canvas>

          <div className="axis">
            <div className="tick">
              <span className="day-number">10</span>
              <span className="day-name">MON</span>
              <span className="value value--this">26°C</span>
            </div>
            <div className="tick">
              <span className="day-number">11</span>
              <span className="day-name">TUE</span>
              <span className="value value--this">14°C</span>
            </div>
            <div className="tick">
              <span className="day-number">12</span>
              <span className="day-name">WED</span>
              <span className="value value--this">22°C</span>
            </div>
            <div className="tick">
              <span className="day-number">13</span>
              <span className="day-name">THU</span>
              <span className="value value--this">12°C</span>
            </div>
            <div className="tick">
              <span className="day-number">14</span>
              <span className="day-name">FRI</span>
              <span className="value value--this">20°C</span>
            </div>
            <div className="tick">
              <span className="day-number">15</span>
              <span className="day-name">SAT</span>
              <span className="value value--this">12°C</span>
            </div>
            <div className="tick">
              <span className="day-number">16</span>
              <span className="day-name">SUN</span>
              <span className="value value--this">18°C</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-content-component">
        <div className="py-2 home-title ">Welcome to WeathHedge</div>
        <div className="col-10 mx-auto">
          WeathHedge is a Weather derivatives trading platform that empowers
          users to hedge against weather-related financial risks effectively,
          reducing exposure to unpredictable elements. The platform owner
          creates and lists hedging contracts, allowing users to easily purchase
          them by paying the specified premium. Funds from buyers are securely
          stored in a vault, reducing risk. The platform continuously monitors
          relevant weather data to determine contract conditions, ensuring
          precise risk management. When met, automatic payouts are calculated
          and distributed to buyers, offering a transparent and secure way to
          hedge against the unpredictability of weather.
        </div>
      </div>
    </div>
  );
}

export default HomePage;
