import React, { useEffect, useRef } from "react";
import hero from "../../assets/hero-img3.png";
import "../../styles/home/Home.css";
import { Chart } from "chart.js";
import homeImage from "../../assets/homeImage.png"
import weathHedgeFlow from "../../assets/WeathHedgeFlow.png"
import weatherGif from "../../assets/WeatherGif/weather6.gif"
import HomeAbout from "./HomeAbout";

function HomePage() {

 
  // const StarryBackground = () => {
  // useEffect(() => {
  //   Particles.init({
  //     selector: '#particles-js',
  //     color: '#ffffff', // Set color to white (for stars)
  //     connectParticles: true,
  //     sizeVariations: 4, // Adjust size variations of stars
  //     maxParticles: 1000, // Set the maximum number of stars
  //     responsive: [
  //       {
  //         breakpoint: 768,
  //         options: {
  //           maxParticles: 200 // Adjust for smaller screens if needed
  //         }
  //       },
  //       {
  //         breakpoint: 425,
  //         options: {
  //           maxParticles: 100 // Adjust for mobile screens if needed
  //         }
  //       }
  //     ]
  //   });
  // }, []);}

  return (
    <div style={{backgroundColor:"black"}} >
      {/* <div className="d-flex mx-auto">
      <div className=" home-title col-6 my-auto"> <span style={{fontSize:"2rem", fontWeight:"700", backgroundColor:"black", width:"70%", borderRadius:"2.5rem", marginTop:"2rem", padding:"0.8rem 5rem "}}><span className="text-white">Welcome to </span> <span style={{color:"#93ff00"}}> Weath</span><span style={{color:"white"}}>Hedge</span> </span></div>

      <div>
        <img className="col-6" src={homeImage} width={"550px"}/>
      </div>
      </div> */}

      <div >
      <div className="d-flex" style={{padding: "4rem 0" }}>
        <div className="col-5 mx-auto my-auto">
          <h1 className="text-white green-glow-text">Weather-Proof Your Future with <span style={{ color: "#93ff00" }}>Weath</span><span style={{ color: "white" }}>Hedge</span>!<br /> Hedge Smart, Hedge Secure.</h1>
        </div>
        <div className="col-5 mx-auto" style={{ width: "500px", height: "500px", borderRadius: "50%", overflow: "hidden" }}>
          <img src={weatherGif} alt="Weather GIF" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
        </div>
      </div>


      {/* <div className="  d-flex" style={{backgroundColor:"#ece4db", padding:"6rem  0"}}>
      <div className="col-5 mx-auto my-auto">
        <div className=" py-5 px-3" style={{borderRadius:"3rem", backgroundColor:"black"}}>
        <h1 className="text-white">Weather-Proof Your Future with <span style={{ color: "#93ff00" }}>Weath</span><span style={{ color: "white" }}>Hedge</span>!<br /> Hedge Smart, Hedge Secure.</h1>
        </div>
      </div>
      <div className="col-5 mx-auto">
        <img src={weatherGif} alt="Weather GIF" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }}/>
      </div>
    </div> */}

      {/* <div className="  d-flex" style={{backgroundColor:"black", padding:"6rem  0"}}>
      <div className="col-5 mx-auto my-auto">
        <h1 className="text-white">Weather-Proof Your Future with <span style={{ color: "#93ff00" }}>Weath</span><span style={{ color: "white" }}>Hedge</span>!<br /> Hedge Smart, Hedge Secure.</h1>
      </div>
      <div className="col-5 mx-auto">
        <img src={weatherGif} alt="Weather GIF" width={500} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }}/>
      </div>
    </div> */}
      </div>

      <div className=" home-title my-auto" style={{paddingTop:"3rem", paddingBottom:"2.5rem"}}> <span className="homeTitleBox"><span>About  </span> <span style={{color:"#93ff00"}}> Weath</span><span>Hedge</span></span></div>

      <HomeAbout/>
    
     

      <div className=" home-title"  style={{marginTop:"6rem"}}> <span className="homeTitleBox"><span className="text-white">How  </span> <span style={{color:"#93ff00"}}> Weath</span><span style={{color:"white"}}>Hedge</span> <span className="text-light">works?</span></span></div>
     
      <div className="d-flex mx-auto " style={{marginTop:"5rem"}} >
    
        <img className="mx-auto" src={weathHedgeFlow} width={"850px"}/>
   
      </div>
    </div>
  );
}

export default HomePage;
