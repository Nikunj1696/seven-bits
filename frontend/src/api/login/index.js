import { axios } from "../index";

const loginAPI = async (data) => {
  return await axios
    .post(`/auth/login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

const logOutAPI = async () => {
  return await axios
    .delete(`/auth/logout`)
    .then((res) => {
      localStorage.removeItem("accessToken");
      return res.data;
    })
    .catch((e) => {
      if (e.response) {
        alert(e.response?.data?.message ?? "Something went wrong");
      }
    });
};
export { loginAPI, logOutAPI };
