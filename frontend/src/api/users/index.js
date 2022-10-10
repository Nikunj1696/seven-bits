import { axios } from "../index";

const getUserList = async (data) => {
  return await axios
    .get(`/user/list?search=${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

const addUserAPI = async (data) => {
  const formBody = new FormData();
  formBody.append("full_name", data.full_name);
  formBody.append("email", data.email);
  formBody.append("password", data.password);
  formBody.append("type", data.type);
  if (data.profile !== null) {
    formBody.append("profile", data.profile);
  }

  return await axios
    .post(`/user/add`, formBody)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const editUserAPI = async (data, id) => {
  const formBody = new FormData();
  formBody.append("full_name", data.full_name);
  formBody.append("email", data.email);
  formBody.append("password", data.password);
  formBody.append("type", data.type);
  if (data.profile !== null) {
    formBody.append("profile", data.profile);
  }

  return await axios
    .put(`/user/edit/${id}`, formBody)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const getUserDetails = async (id) => {
  return await axios
    .get(`/user/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const deleteUserAPI = async (id) => {
	return await axios
	  .delete(`/user/${id}`)
	  .then((res) => {
		return res.data;
	  })
	  .catch((err) => {
		return err.response.data;
	  });
};

  
export { getUserList, addUserAPI, editUserAPI, getUserDetails, deleteUserAPI };

