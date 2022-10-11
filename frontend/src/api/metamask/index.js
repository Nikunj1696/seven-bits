import { axios } from "../index";

const storeMetamaskDetails = async (data) => {
  return await axios
    .post(`/user/metamask`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export { storeMetamaskDetails };
