import React from "react";
import "../../styles/derivative/TempDerivative.css";
import temp from "../../assets/temp.jpg";

function TempDerivative() {
  return (
    <div>
      <div className="d-flex py-5 px-5 justify-content-around">
        <div className="temp-derivative-main col-4">
          <div className="derivative-img-div">
            <img src={temp} className="derivative-img" />
          </div>
          <div className="derivative-details">
            <div>Contract Name: </div>
            <div>Contract description: </div>
            <div>Coverage Period: </div>
            <div>Premium Amount: </div>
            <div>Contract Type: </div>
            <div>Location: </div>
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
                          Quantity
                        </label>
                        <input type="number" min={1} className="form-control" />
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger">
                      <>Submit</>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempDerivative;
