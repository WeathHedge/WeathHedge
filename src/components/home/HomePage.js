import React, { useEffect, useRef } from "react";
import hero from "../../assets/hero-img3.png";
import "../../styles/home/Home.css";
import { Chart } from "chart.js";
import homeImage from "../../assets/homeImage.png"
import weathHedgeFlow from "../../assets/WeathHedgeFlow.png"

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
    <div >
      {/* <div className="d-flex mx-auto">
      <div className=" home-title col-6 my-auto"> <span style={{fontSize:"2rem", fontWeight:"700", backgroundColor:"black", width:"70%", borderRadius:"2.5rem", marginTop:"2rem", padding:"0.8rem 5rem "}}><span className="text-white">Welcome to </span> <span style={{color:"#93ff00"}}> Weath</span><span style={{color:"white"}}>Hedge</span> </span></div>

      <div>
        <img className="col-6" src={homeImage} width={"550px"}/>
      </div>
      </div> */}

      <div>
        <div className="bg-dark py-3 my-2">
          <div className="col-5 ">
            <h1 className="text-white">Weather-Proof Your Future with <span style={{color:"#93ff00"}}> Weath</span><span style= {{color:"white"}}>Hedge</span>!<br/> Hedge Smart, Hedge Secure.</h1>
          </div>
          <div className="col-5">
              
          </div>
        </div>
      </div>

      

      <div className=" home-title my-auto" style={{paddingTop:"5rem", paddingBottom:"2.5rem"}}> <span style={{fontSize:"2rem", fontWeight:"700", backgroundColor:"black", width:"70%", borderRadius:"2.5rem",padding:"0.8rem 5rem "}}><span className="text-white">About  </span> <span style={{color:"#93ff00"}}> Weath</span><span style={{color:"white"}}>Hedge</span></span></div>
      <div className="d-flex mx-auto">
      <div>
        <div className="col-5 mx-auto py-5" style={{paddingLeft:"8rem"}}>
          <div className="card">
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
      </div>
      <div className="home-content-component col-7 mx-auto" >
        
        <div className="col-10 mx-auto text-left" style={{textAlign:"left", fontSize:"1.3rem", color:"#93ff00", backgroundColor:"black", padding:"2rem", borderRadius:"4rem"}}>
          <ul>
            <li>
          <p>WeathHedge is a Weather derivatives trading platform that empowers
          users to hedge against weather-related financial risks effectively,
          reducing exposure to unpredictable elements. </p></li>
          
          <li><p> The platform owner creates and lists hedging contracts, allowing users to easily purchase
          them by paying the specified premium. Funds from buyers are securely
          stored in a vault, reducing risk.</p></li>
          
          <li><p>The platform continuously monitors
          relevant weather data to determine contract conditions, ensuring
          precise risk management. </p></li>
          
          <li><p>When met, automatic payouts are calculated
          and distributed to buyers, offering a transparent and secure way to
          hedge against the unpredictability of weather.</p></li>
          </ul>
        </div>
      </div>

      
      </div>
      <div className="d-flex mx-auto " style={{marginTop:"5rem"}} >
      <div>
        <img className="col-9" src={weathHedgeFlow} width={"850px"}/>
      </div>
      <div className=" home-title col-6 my-auto"> <span style={{fontSize:"2rem", fontWeight:"700", backgroundColor:"black", width:"70%", borderRadius:"2.5rem", marginTop:"2rem", padding:"0.8rem 5rem "}}><span className="text-white">How  </span> <span style={{color:"#93ff00"}}> Weath</span><span style={{color:"white"}}>Hedge</span> <span className="text-light">works?</span></span></div>
      </div>
    </div>
  );
}

export default HomePage;
