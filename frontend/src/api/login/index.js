import { axios } from "../index";

const loginAPI =  async (data) => {
  return await axios
    .post(`/auth/login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export default loginAPI;