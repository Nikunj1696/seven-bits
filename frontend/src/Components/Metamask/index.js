import React, { useState } from "react";
import { storeMetamaskDetails } from "../../api/metamask";
import { handleSignMessage } from "./metamaskHelper";
import Web3 from "web3";
import constants from "../../utils/constants";

let web3 = new Web3(Web3.givenProvider || constants.REACT_APP_WEB3_URL);

const Metamask = () => {
  const [loading, setLoading] = useState(false);
  const [publicAddress, setPublicAddress] = useState("");
  const [signature, setSignature] = useState("");

  const handleClick = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }
    if (web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAdd = coinbase.toLowerCase();
    setLoading(true);

    const res = await storeMetamaskDetails(publicAdd);
    if (res.status === 200) {
      setPublicAddress(publicAdd);
    }
    if (res.status === 400) {
      alert(JSON.stringify(res?.message));
    }

    // Popup MetaMask confirmation modal to sign message
    const signIn = await handleSignMessage(publicAdd, res.data.pin);

	  if (signIn) {
      setSignature(signIn.signature);
    }

    setLoading(false);
  };
  return (
    <div className="container">
      <h2 className="text-center">Metamask</h2>
      <div className="mt-3 ">
        {publicAddress ? (
          <>
            <h6>Public Address : {publicAddress ?? "-"} </h6> <br />
            <h6>Signature : {signature ?? "-"} </h6> <br />
          </>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-warning btn-lg mt-5 text-center"
              type="button"
              onClick={() => handleClick()}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect With MetaMask"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metamask;
