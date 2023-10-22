import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../../styles/derivative/TempDerivative.css";
import temp from "../../assets/temp.jpg";
import { derivativeInstance } from "../Contract";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function TempDerivative() {
  const [allDerivatives, setAllDerivatives] = useState([]);
  const navigate = useNavigate();
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

  const buyContract = async (id) => {
    try {
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
        // setbtnloading(false);
        navigate("/profile");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.reason);
    }
  };

  function hexToTimestamp(hex) {
    const unixTimestamp = parseInt(hex, 16);
    const date = new Date(unixTimestamp * 1000);
    const localDate = date.toLocaleString("en-US");
    return localDate;
  }

  return (
    <div>
      <div className="d-flex py-5 px-5 justify-content-around">
        {isPageLoading ? (
          <div>
            <ClipLoader color="#000" />
          </div>
        ) : allDerivatives.length > 0 ? (
          allDerivatives.map((item, key) => (
            <div className="temp-derivative-main col-4" index={key}>
              <div className="derivative-img-div">
                <img src={`https://ipfs.io/ipfs/${item.image}`} className="derivative-img" />
              </div>
              <div className="derivative-details">
                <div>Contract Name: {item.name}</div>
                <div>Contract description: {item.description}</div>
                <div>
                  Coverage Start Date:{" "}
                  {hexToTimestamp(item.coverageStartDate._hex)}
                </div>
                <div>
                  Coverage End Date: {hexToTimestamp(item.coverageEndDate._hex)}
                </div>
                <div>
                  Premium Amount: {parseInt(item.premiumAmount._hex, 16)/ 1000000} USDC
                </div>
                {/* <div>Contract Type: </div> */}
                <div>Location: {item.location}</div>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn buy-derivative-btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal-${key}`}
                >
                  View
                </button>

                <div
                  className="modal fade"
                  id={`exampleModal-${key}`}
                  tabindex="-1"
                  aria-labelledby={`exampleModalLabel-${key}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel-${key}`}>
                          Contract details
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Name
                            </label>
                            <div className="modal-form-data">{item.name}</div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Description
                            </label>
                            <div className="modal-form-data">
                              {item.description}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Location
                            </label>
                            <div className="modal-form-data">
                              {item.location}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Coverage Start Date
                            </label>
                            <div className="modal-form-data">
                              {hexToTimestamp(item.coverageStartDate._hex)}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Coverage End Date
                            </label>
                            <div className="modal-form-data">
                              {hexToTimestamp(item.coverageEndDate._hex)}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Strike Value
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.strikeValue._hex, 16)} HDD
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Premium Amount
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.premiumAmount._hex, 16)/1000000} USDC
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Payout Amount
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.payoutAmount._hex, 16)/1000000} USDC
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Max buyers
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.maxBuyers._hex, 16)}
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => buyContract(item.contractId)}
                        >
                          <>Buy</>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
