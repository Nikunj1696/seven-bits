import { axios } from "../index";

const registerAPI = async (data) => {
  return await axios
    .post(`/auth/signup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export default registerAPI;
