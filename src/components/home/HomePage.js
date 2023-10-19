import React from "react";
import hero from "../../assets/hero-img.png";

function HomePage() {
  return (
    <div>
      <div className="py-2">
        <img src={hero} width={600} />
      </div>
      <div className="py-2">
        <div className="py-2">Introduction</div>
      </div>
    </div>
  );
}

export default HomePage;
