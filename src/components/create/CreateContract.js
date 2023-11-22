import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import "../../styles/create/CreateContract.css";
import { derivativeInstance } from "../Contract";

function CreateContract() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    location: "",
    coverageStartDate: "",
    coverageEndDate: "",
    strikeValue: "",
    premiumAmount: "",
    payoutAmount: "",
    maxBuyers: "",
  });
  const { address } = useAccount();
  const navigate = useNavigate();
  const [btnloading, setbtnloading] = useState(false);

  const client = new Web3Storage({
    token: process.env.REACT_APP_STORAGE_TOKEN,
  });

  const uploadImage = async () => {
    try {
      const fileInput = document.querySelector('input[type="file"]');
      console.log("ipfs client: ", client);

      const rootCid = await client.put(fileInput.files, {
        name: formData.image.name,
        maxRetries: 3,
      });

      console.log(formData);
      return rootCid + "/" + fileInput.files[0].name;
    } catch (e) {
      console.log(e);
    }
  };

  const startDateToUnixTime = () => {
    const dateObject = new Date(formData.coverageStartDate);
    return Math.floor(dateObject.getTime() / 1000);
  };

  const endDateToUnixTime = () => {
    const dateObject = new Date(formData.coverageEndDate);
    return Math.floor(dateObject.getTime() / 1000);
  };

  const handleCreate = async () => {
    try {
      setbtnloading(true);
      const cid = await uploadImage();
      console.log("cid: ", cid);

      console.log("Form Data: ", formData);
      const { ethereum } = window;

      console.log("Start date: ", startDateToUnixTime());
      console.log("End date: ", endDateToUnixTime());

      const startTime = startDateToUnixTime();
      const endTime = endDateToUnixTime();

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const con = await derivativeInstance();
        console.log("Hello");
        const tx = await con.createContract(
          formData.name,
          cid,
          formData.description,
          formData.location,
          startTime,
          endTime,
          formData.strikeValue,
          formData.premiumAmount,
          formData.payoutAmount,
          formData.maxBuyers
        );

        console.log(tx);
        await tx.wait();
        setbtnloading(false);
        navigate("/derivatives");
      }
    } catch (e) {
      console.log("Error in creating user account: ", e);
    }
  };

  return (
    <div className="col-lg-6 col-7 mx-auto py-4">
      <div className="mb-3">
        <label className="form-label">
          Upload Image <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          className="form-control form-control-md"
          type="file"
          onChange={(e) => {
            setFormData({
              ...formData,
              image: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Name <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Description <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <textarea
          className="form-control"
          rows="3"
          value={formData.description}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Location <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.location}
          onChange={(e) => {
            setFormData({
              ...formData,
              location: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Coverage Start Date <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="date"
          className="form-control"
          value={formData.coverageStartDate}
          onChange={(e) => {
            setFormData({
              ...formData,
              coverageStartDate: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Coverage End Date <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="date"
          className="form-control"
          value={formData.coverageEndDate}
          onChange={(e) => {
            setFormData({
              ...formData,
              coverageEndDate: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Strike Value <span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="number"
          className="form-control"
          value={formData.strikeValue}
          onChange={(e) => {
            setFormData({
              ...formData,
              strikeValue: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Premium Amount<span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="number"
          className="form-control"
          value={formData.premiumAmount}
          onChange={(e) => {
            setFormData({
              ...formData,
              premiumAmount: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Payout Amount<span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="number"
          className="form-control"
          value={formData.payoutAmount}
          onChange={(e) => {
            setFormData({
              ...formData,
              payoutAmount: e.target.value,
            });
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Maximum Buyers<span style={{ color: "red" }}>&nbsp;*</span>
        </label>
        <input
          type="number"
          className="form-control"
          value={formData.maxBuyers}
          onChange={(e) => {
            setFormData({
              ...formData,
              maxBuyers: e.target.value,
            });
          }}
        />
      </div>

      <div className="d-grid">
        <button
          type="button"
          className="btn btn-lg btn-danger"
          onClick={handleCreate}
        >
          {btnloading ? (
            <>
              <SyncLoader color="#fff" size={12} speedMultiplier={0.8} />
            </>
          ) : (
            <>Create</>
          )}
        </button>
      </div>
    </div>
  );
}

export default CreateContract;
