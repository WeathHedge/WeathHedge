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
        console.log("Derivatives: ", allDerivatives);
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
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.reason);
    }
  };

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
                <img src={temp} className="derivative-img" />
              </div>
              <div className="derivative-details">
                <div>Contract Name: {item.name}</div>
                <div>Contract description: {item.description}</div>
                <div>
                  Coverage Start Date:{" "}
                  {parseInt(item.coverageStartDate._hex, 16)}
                </div>
                <div>
                  Coverage End Date: {parseInt(item.coverageEndDate._hex, 16)}{" "}
                </div>
                <div>
                  Premium Amount: {parseInt(item.premiumAmount._hex, 16)}
                </div>
                {/* <div>Contract Type: </div> */}
                <div>Location: {item.location}</div>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn buy-derivative-btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal-1`}
                >
                  View
                </button>

                <div
                  className="modal fade"
                  id={`exampleModal-1`}
                  tabindex="-1"
                  aria-labelledby={`exampleModalLabel-1`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel-1`}>
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
                              Max buyers
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.maxBuyers._hex, 16)}
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Payout Amount
                            </label>
                            <div className="modal-form-data">
                              {parseInt(item.payoutAmount._hex, 16)}
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Terms and Conditions
                            </label>
                            <div className="modal-form-data">
                              {item.termsAndConditions}
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label modal-form-text">
                              Data source
                            </label>
                            <div className="modal-form-data">
                              {item.dataSource}
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
