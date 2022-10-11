import Web3 from "web3";
import constants from "../../utils/constants";

let web3 = new Web3(Web3.givenProvider || constants.REACT_APP_WEB3_URL);

const handleSignMessage = async (publicAddress, pin) => {
  
  try {
    const signature = await web3.eth.personal.sign(
      `Signin one time pin: ${pin}`,
      publicAddress,
      "" // MetaMask will ignore the password argument here
    );

    return { publicAddress, signature };
  } catch (err) {
	  alert(JSON.stringify(err.message))
    throw new Error("You need to sign the message to be able to log in.");
  }
};

export { handleSignMessage };
