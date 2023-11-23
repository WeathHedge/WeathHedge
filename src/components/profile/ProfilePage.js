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

  useEffect(() => {
    // Enable Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
    );

    // Clean up when the component unmounts
    return () => {
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltip = window.bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltip) {
          tooltip.dispose();
        }
      });
    };
  });

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
    <div className="main-profile-page">
      {/* Withdraw */}
      <div className="d-flex py-4 col-11 mx-auto align-items-center">
        <div className="d-flex col-6 align-items-center">
          <div className="">
            {" "}
            <h2 className="text-light">Withdraw Amount:</h2>
          </div>
          <div className="px-3">
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Withdraw Here
            </button>
          </div>
        </div>
        <div className="d-flex col-6 align-items-center">
          <div className="">
            {" "}
            <h2 className="text-light">Stake Amount to Vault:</h2>
          </div>
          <div className="px-3">
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Stake Here
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Alert Message
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ fontSize: "1.3rem", fontWeight: "600" }}
                  >
                    Hang Tight! Work is in Progress.📈
                  </div>
                  {/* <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
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
          <h2 className="text-light">Contracts Bought:</h2>
        </div>

        <div className="row col-12 px-0 user-contracts-main mt-4 py-3 px-sm-3 justify-content-around">
          <div className="d-flex justify-content-center">
            {/* <ClipLoader color="#4250ff" /> */}
          </div>
          {isPageLoading ? (
            <div>
              <ClipLoader color="#5cd200" />
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
                    <div className="user-derivative-head">
                      Contract Name &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="This field displays the type of the contract."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Contract description &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="A short summary that tells you the basic details and what the contract is all about."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{item.description}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Location &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The place where the HDD/CDD of the given contract are based on."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{item.location}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Coverage Start Date &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The day when the contract's execution begins."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{hexToTimestamp(item.coverageStartDate._hex)}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Coverage End Date &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The day when the contract is terminated."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{hexToTimestamp(item.coverageEndDate._hex)}</div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Strike Value &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="It is a threshold value above which it is expected that HDD/CDD will not exceed."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{parseInt(item.strikeValue._hex, 16)} HDD </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Premium Amount &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The amount you pay at the beginning to buy the contract."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>
                      {parseInt(item.premiumAmount._hex, 16) / 1000000} USDC
                    </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Payout Amount &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The amount you can get after contract reaches its expiration date and the contract is settled."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>
                      {parseInt(item.payoutAmount._hex, 16) / 1000000} USDC
                    </div>
                  </div>
                  <div className="user-contracts-title">
                    <div className="user-derivative-head">
                      Maximum Buyers &nbsp;&nbsp;{" "}
                      <a
                        href="#"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="The most people allowed to have this contract, so you know how many others can join in."
                        className="icon-link"
                      >
                        <i className="fas fa-info-circle head-info"></i>
                      </a>
                    </div>
                    <div>{parseInt(item.maxBuyers._hex, 16)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                color: "white",
                fontSize: "1.4rem",
                fontWeight: "600",
                height: "40vh",
              }}
            >
              No Contracts Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
