import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../../styles/derivative/TempDerivative.css";
import temp from "../../assets/temp.jpg";
import { derivativeInstance } from "../Contract";
import { useNavigate } from "react-router-dom";
import {
  ClipLoader,
  MoonLoader,
  PropagateLoader,
  SyncLoader,
} from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
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

  const buyContract = async (id, index) => {
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
    <div>
      <div className="row col-12 d-flex py-5 px-5 justify-content-around">
        {isPageLoading ? (
          <div>
            <ClipLoader color="#000" />
          </div>
        ) : allDerivatives.length > 0 ? (
          allDerivatives.map((item, key) => (
            <div
              className="temp-derivative-main col-md-5 col-sm-7 col-11 mb-5"
              index={key}
            >
              <div className="derivative-img-div">
                <img
                  src={`https://ipfs.io/ipfs/${item.image}`}
                  className="derivative-img"
                />
                {/* <a href="https://ipfs.io/ipfs/${item.image}">Click here</a> */}
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
                      title="This field displays the short description about the contract."
                      className="icon-link"
                    >
                      <i className="fas fa-info-circle head-info"></i>
                    </a>
                  </div>
                  <div>{item.description}</div>
                </div>
                <div className="py-1">
                  <div className="derivative-title">
                    Coverage Start Date &nbsp;&nbsp;{" "}
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="This field displays the "
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
                      title="Coverage end date"
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
                      title="Strike value"
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
                      title="Premium amount"
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
                      title="Payout amount"
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
                    Location &nbsp;&nbsp;{" "}
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="location"
                      className="icon-link"
                    >
                      <i className="fas fa-info-circle head-info"></i>
                    </a>{" "}
                  </div>
                  <div>{item.location}</div>
                </div>
                <div className="py-1">
                  <div className="derivative-title">
                    Maximum buyers &nbsp;&nbsp;{" "}
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="maximum buyers"
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
                  className="btn btn-danger buy-derivative-btn"
                  onClick={() => buyContract(item.contractId, key)}
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
          <div>No Contracts Available</div>
        )}
      </div>
    </div>
  );
}

export default TempDerivative;
