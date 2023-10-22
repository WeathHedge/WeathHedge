import React from "react";
import "../../styles/home/Sponsor.css";
import polygon from "../../assets/sponsors/polygon.png"
import chainlink from "../../assets/sponsors/chainlink.png"
function Sponsor() {
  const sponsors = [
    {
      id: 1,
      name: "Polygon",
      image_url:polygon,
      description:
        'Polygon designed to address some of the scalability and performance limitations of the Ethereum blockchain, aiming to provide a more efficient and cost-effective platform for decentralized applications (DApps)',
      //   image_url: push,
    },
    {
      id: 2,
      name: "Chainlink",
      image_url:chainlink,
      description:
        'Chainlink is a decentralized oracle network and service that provides tamper-proof, reliable data for smart contracts on various blockchain platforms, most notably Ethereum.',
      //   image_url: bacallhau,
    }
  ];

  return (
    <div className="sponsor-section">
       <div className=" home-title my-auto" style={{paddingTop:"5rem", paddingBottom:"2.5rem"}}> <span style={{fontSize:"2rem", fontWeight:"700", backgroundColor:"black", width:"70%", borderRadius:"2.5rem",padding:"0.8rem 5rem "}}><span style={{color:"white"}}>Powered By</span></span></div>
      <div className="sponsor-cards">
        {sponsors.map((sponsor) => (
          <div
            className="sponsor-card"
            key={sponsor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: sponsor.id * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-container">
              <img src={sponsor.image_url} alt={sponsor.name} />
            </div>

            <h1 className="sponsor-name">{sponsor.name}</h1>

            <p className="LandingSponsorDesc">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsor;
