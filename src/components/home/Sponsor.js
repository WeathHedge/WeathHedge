import React from "react";
import "../../styles/home/Sponsor.css";

function Sponsor() {
  const sponsors = [
    {
      id: 1,
      name: "Push Protocol",
      description:
        '"Push Protocol is a web3 communication network, enabling cross-chain notifications and messaging for dapps, wallets, and services.',
      //   image_url: push,
    },
    {
      id: 2,
      name: "Bacalhau",
      description:
        '"Bacalhau is a platform for fast, cost-efficient, and secure computation that enables users to run compute jobs where the data is generated and stored.',
      //   image_url: bacallhau,
    },
    {
      id: 3,
      name: "Tableland",
      description:
        "Tableland is an open source, permissionless cloud database built on SQLite. Read and write tamperproof data from apps, data pipelines, or EVM smart contracts.",
      //   image_url: ens,
    },
  ];

  return (
    <div className="sponsor-section">
      <h1 className="powered-by-heading"> Powered By </h1>
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
              {/* <img src={sponsor.image_url} alt={sponsor.name} /> */}
            </div>

            <h2 className="sponsor-name">{sponsor.name}</h2>

            <p className="LandingSponsorDesc">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsor;
