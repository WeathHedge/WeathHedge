import { ethers } from "ethers";
import weathHedgeABI from "../contracts/artifacts/WeathHedgeABI.json";

export const DERIVATIVE_ADDRESS = "0x5735a85CF471aaEE84A281fecc206E77A8e20D31";

export const derivativeInstance = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (!provider) {
      console.log("Metamask is not installed, please install!");
    }
    const con = new ethers.Contract(DERIVATIVE_ADDRESS, weathHedgeABI, signer);
    // console.log(con);
    return con;
  } else {
    console.log("error");
  }
};
