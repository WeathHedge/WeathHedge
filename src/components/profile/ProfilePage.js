import React, { useState, useEffect } from "react";
import "../../styles/profile/Profile.css";
import { ethers } from "ethers";
import { derivativeInstance } from "../Contract";
import { useAccount } from "wagmi";
import { ClipLoader } from "react-spinners";
import temp from "../../assets/temp.jpg";
import { DERIVATIVE_ADDRESS } from "../Contract";

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

  function hexToTimestamp(hex) {
    const unixTimestamp = parseInt(hex, 16);
    const date = new Date(unixTimestamp * 1000);
    const localDate = date.toLocaleString("en-US");
    return localDate;
  }

  const transferAmount = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionResponse = await signer.sendTransaction({
          to: "0x8ca6d6Ef50AD8fcC38358845C76d9606d5d67D07",
          value: ethers.utils.parseEther("1"),
        });
        await transactionResponse.wait();
        alert(`Transaction successful with hash: ${transactionResponse.hash}`);
      } else {
        throw new Error("Ethereum provider not found");
      }
    } catch (error) {
      alert(`Transaction failed with error: ${error.message}`);
    }
  };

  return (
    <div>
      {/* Withdraw */}
      <div className="d-flex py-4 col-11 mx-auto align-items-center">
        <div className="d-flex col-6 align-items-center">
          <div className="">
            {" "}
            <h2>Withdraw Amount:</h2>
          </div>
          <div className="px-3">
            <button className="btn btn-success" onClick={withdrawAmount}>
              {" "}
              Withdraw Here
            </button>
          </div>
        </div>
        <div className="d-flex col-6 align-items-center">
          <div className="">
            {" "}
            <h2>Stake Amount to Vault:</h2>
          </div>
          <div className="px-3">
            <button className="btn btn-success" onClick={transferAmount}>
              {" "}
              Stake Here
            </button>
          </div>
        </div>
        {/* <div className="d-flex col-6">
          <div className="d-flex">Total amount spent :</div>
          <div className="px-3">
            <input type="text" />
          </div>
        </div> */}
      </div>

      {/* Contracts bought */}
      <div>
        <div className="d-flex col-11 mx-auto py-2">
          {" "}
          <h2>Contracts Bought:</h2>
        </div>

        <div className="row col-12 px-0 user-contracts-main mt-4 py-3 px-sm-3 justify-content-around">
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
                className="col-md-5 col-sm-7 col-11 mx-1 mb-5 user-contracts-component"
                index={key}
              >
                <div className="user-contract-img-div">
                  <img
                    src={`https://ipfs.io/ipfs/${item.image}`}
                    // src={temp}
                    className="derivative-img"
                    alt="image not found"
                  ></img>
                </div>
                <div className="user-contracts-details">
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Contract title </div>
                    <div>{item.name}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Contract description
                    </div>
                    <div>{item.description}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Location </div>
                    <div>{item.location}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Coverage Start Date
                    </div>
                    <div>{hexToTimestamp(item.coverageStartDate._hex)}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Coverage End Date
                    </div>
                    <div>{hexToTimestamp(item.coverageEndDate._hex)}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Strike Value </div>
                    <div>{parseInt(item.strikeValue._hex, 16)} USDC </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Premium Amount </div>
                    <div>
                      {parseInt(item.premiumAmount._hex, 16) / 1000000} USDC
                    </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Payout Amount </div>
                    <div>
                      {parseInt(item.payoutAmount._hex, 16) / 1000000} USDC
                    </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">Maximum Buyers </div>
                    <div>{parseInt(item.maxBuyers._hex, 16)}</div>
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
