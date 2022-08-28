import { ethers } from "ethers";
import Patient from "../artifacts/contracts/Patient.sol/Patient.json";
const contractAddress = "0x46458c3adffdBfCa019C6Ec1D940e5bF5E8CEA75";
export const getAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, Patient.abi, signer);
  return contract;
};
