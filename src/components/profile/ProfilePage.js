import React from "react";
import "../../styles/profile/Profile.css";

function ProfilePage() {
  return (
    <div>
      {/* Withdraw */}
      <div className="d-flex py-4 col-11 mx-auto align-items-center">
        <div className="d-flex col-6 align-items-center">
          <div className="">Withdraw Stake:</div>
          <div className="px-3">
            <button className="btn btn-success"> Withdraw Here</button>
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
        <div className="d-flex col-11 mx-auto py-2">
            Contracts Bought:
        </div>
        <div className="row col-11 px-0 user-contracts-main mt-4 py-3 px-sm-3 justify-content-around">
          <div className="d-flex justify-content-center">
            {/* <ClipLoader color="#4250ff" /> */}
          </div>

          <div className="col-xxl-3 col-md-5 col-sm-7 col-11 mx-1 mb-5 user-contracts-component">
            <div className="user-contracts-img-div">
              {/* <img
                    // src={`https://gateway.lighthouse.storage/ipfs/${item.uploadImage}`}
                    className="user-contracts-img"
                  ></img> */}
            </div>
            <div className="user-contracts-details">
              <div className="user-contracts-title">Contract title</div>
              <div className="user-contracts-desc">Contract description</div>
              <div className="user-contracts-badge">Coverage period</div>
              <div className="user-contracts-btn">Premuim Amount</div>
              <div className="user-contracts-title">Contract Type</div>
              <div className="user-contracts-title">Location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
