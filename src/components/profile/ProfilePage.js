import React, { useState, useEffect } from "react";
import "../../styles/profile/Profile.css";
import { ethers } from "ethers";
import { derivativeInstance } from "../Contract";
import { useAccount } from "wagmi";
import { ClipLoader } from "react-spinners";

function ProfilePage() {
  const [allUserContracts, setAllUserContracts] = useState([]);
  const { address } = useAccount();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const allDerivativeData = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await derivativeInstance();
        const getDerivativeDetails = await con.getContractBoughtByUser(address);
        setAllUserContracts(getDerivativeDetails);
        console.log("Derivatives: ", allUserContracts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchDerivativeContracts() {
      await allDerivativeData();
      setIsPageLoading(false);
    }
    // console.log("hello");
    fetchDerivativeContracts();
  }, []);

  const withdrawAmount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await derivativeInstance();
        const getDerivativeDetails = await con.withdrawMoney();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Withdraw */}
      <div className="d-flex py-4 col-11 mx-auto align-items-center">
        <div className="d-flex col-6 align-items-center">
          <div className="">Withdraw Stake:</div>
          <div className="px-3">
            <button className="btn btn-success" onClick={withdrawAmount}>
              {" "}
              Withdraw Here
            </button>
          </div>
        </div>
        <div className="d-flex col-6">
          <div className="d-flex">Total amount spent :</div>
          <div className="px-3">
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Contracts bought */}
      <div>
        <div className="d-flex col-11 mx-auto py-2">Contracts Bought:</div>

        <div className="row col-11 px-0 user-contracts-main mt-4 py-3 px-sm-3 justify-content-around">
          <div className="d-flex justify-content-center">
            {/* <ClipLoader color="#4250ff" /> */}
          </div>
          {isPageLoading ? (
            <div>
              <ClipLoader color="#000" />
            </div>
          ) : allUserContracts.length > 0 ? (
            allUserContracts.map((item, key) => (
              <div
                className="col-xxl-3 col-md-4 col-sm-7 col-11 mx-1 mb-5 user-contracts-component"
                index={key}
              >
                <div className="user-contracts-img-div">
                  <img
                    // src={`https://gateway.lighthouse.storage/ipfs/${item.uploadImage}`}
                    src={item.image}
                    className="user-contracts-img"
                  ></img>
                </div>
                <div className="user-contracts-details">
                  <div className="user-contracts-title">
                    Contract title: {item.name}
                  </div>
                  <div className="user-contracts-desc">
                    Contract description: {item.description}
                  </div>
                  <div className="user-contracts-badge">
                    Coverage Start Date:{" "}
                    {parseInt(item.coverageStartDate._hex, 16)}
                  </div>
                  <div className="user-contracts-btn">
                    Coverage End Date: {parseInt(item.coverageEndDate._hex, 16)}
                  </div>
                  <div className="user-contracts-title">
                    Premuim Amount: {parseInt(item.premiumAmount._hex, 16)}
                  </div>
                  <div className="user-contracts-title">
                    Location: {item.location}
                  </div>
                  <div className="user-contracts-title">
                    Payout Amount: {parseInt(item.payoutAmount._hex, 16)}
                  </div>
                  <div className="user-contracts-title">
                    Maximum Buyers: {parseInt(item.maxBuyers._hex, 16)}
                  </div>
                  <div className="user-contracts-title">
                    Data Source: {item.dataSource}
                  </div>
                  <div className="user-contracts-title">
                    Terms and conditions: {item.termsAndConditions}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Contracts Available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
