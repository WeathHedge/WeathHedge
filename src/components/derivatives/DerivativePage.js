import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../../styles/derivative/TempDerivative.css";
import temp from "../../assets/temp.jpg";
import { derivativeInstance, DERIVATIVE_ADDRESS } from "../Contract";
import { useNavigate } from "react-router-dom";
import {
  ClipLoader,
  MoonLoader,
  PropagateLoader,
  SyncLoader,
} from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import tokenABI from "../../contracts/artifacts/Erc20Abi.json";
import "react-toastify/dist/ReactToastify.css";

function TempDerivative() {
  const [allDerivatives, setAllDerivatives] = useState([]);
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [btnloading, setbtnloading] = useState([]);

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
        const getDerivativeDetails = await con.getAllContracts();
        setAllDerivatives(getDerivativeDetails);
        console.log("Derivatives: ", getDerivativeDetails);
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

  const buyContract = async (id, amount, index) => {
    try {
      toast.info("Process is in Progress", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setbtnloading((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = true;
        return newStatus;
      });

      console.log("Contract Id:  ", id);
      const contract_id = parseInt(id._hex, 16);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        var tokenContract = new ethers.Contract(
          "0x52d800ca262522580cebad275395ca6e7598c014",
          tokenABI,
          signer
        );
        const approvalTx = await tokenContract.approve(
          DERIVATIVE_ADDRESS,
          amount
        );
        const approvalReceipt = await approvalTx.wait();
        if (!approvalReceipt.status) {
          console.error("Token approval failed:", approvalReceipt);
          // Handle the error, for example, show a message to the user
          toast.error("Token approval failed", {
            /* ... */
          });
          setbtnloading((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = false;
            return newStatus;
          });
          return; // Stop further execution
        }

        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const con = await derivativeInstance();
        const tx = await con.purchaseContract(contract_id);
        console.log("tx: ", tx);
        await tx.wait();
        setbtnloading((prevStatus) => {
          const newStatus = [...prevStatus];
          newStatus[index] = false;
          return newStatus;
        });
        navigate("/profile");
        window.location.reload();
      }
    } catch (error) {
      setbtnloading((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = false;
        return newStatus;
      });
      toast.info(error.reason, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error.reason);
    }
  };

  function hexToTimestamp(hex) {
    const unixTimestamp = parseInt(hex, 16);
    const date = new Date(unixTimestamp * 1000);
    const localDate = date.toLocaleString("en-US");
    return localDate;
  }

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

  return (
    <div className="main-contract-component">
      <div
        className="derivative-details-title my-auto"
        style={{ paddingTop: "3rem", paddingBottom: "2.5rem" }}
      >
        {" "}
        <span className="derivativeTitleBox">
          List of Weather Derivative Contracts
        </span>
      </div>
      <div className="row col-12 py-5 px-5 justify-content-around">
        {isPageLoading ? (
          <div>
            <ClipLoader color="#5cd200" />
          </div>
        ) : allDerivatives.length > 0 ? (
          allDerivatives.map((item, key) => (
            <div
              className="temp-derivative-main col-md-5 col-sm-7 col-11 mx-1 mb-5"
              index={key}
            >
              <div className="derivative-img-div">
                <img
                  src={`https://ipfs.io/ipfs/${item.image}`}
                  className="derivative-img"
                />
              </div>
              <div className="derivative-details">
                <div className="py-1">
                  <div className="derivative-title">
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

                <div className="py-1">
                  <div className="derivative-title">
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
                <div className="py-1">
                  <div className="derivative-title">
                    Location &nbsp;&nbsp;{" "}
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="The place where the HDD/CDD of the given contract are based on."
                      className="icon-link"
                    >
                      <i className="fas fa-info-circle head-info"></i>
                    </a>{" "}
                  </div>
                  <div>{item.location}</div>
                </div>
                <div className="py-1">
                  <div className="derivative-title">
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
                <div className="py-1">
                  <div className="derivative-title">
                    Coverage End Date &nbsp;&nbsp;{" "}
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="The day when the contract is terminated."
                      className="icon-link"
                    >
                      <i className="fas fa-info-circle head-info"></i>
                    </a>{" "}
                  </div>
                  <div>{hexToTimestamp(item.coverageEndDate._hex)}</div>
                </div>
                <div className="py-1">
                  <div className="derivative-title">
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
                  <div>{parseInt(item.strikeValue._hex, 16)} HDD</div>
                </div>
                <div className="py-1">
                  <div className="derivative-title">
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

                <div className="py-1">
                  <div className="derivative-title">
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
                {/* <div>Contract Type: </div> */}

                <div className="py-1">
                  <div className="derivative-title">
                    Maximum buyers &nbsp;&nbsp;{" "}
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
              <div className="">
                <button
                  type="button"
                  className="btn buy-derivative-btn"
                  onClick={() =>
                    buyContract(item.contractId, item.premiumAmount, key)
                  }
                >
                  {btnloading[key] ? (
                    <>
                      <SyncLoader
                        color="#fff"
                        size={13}
                        speedMultiplier={0.7}
                      />
                    </>
                  ) : (
                    <>Buy</>
                  )}
                </button>
              </div>
              <ToastContainer />
            </div>
          ))
        ) : (
          <div
            style={{
              color: "white",
              fontSize: "1.4rem",
              fontWeight: "600",
              height: "15vh",
            }}
          >
            No Contracts Available
          </div>
        )}
      </div>
    </div>
  );
}

export default TempDerivative;
