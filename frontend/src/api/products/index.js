import { axios } from "../index";

const getProductList = async (data) => {
  return await axios
    .get(`/product/list?search=${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

const addProductAPI = async (data) => {
  const formBody = new FormData();
  formBody.append("product_name", data.product_name);
  formBody.append("description", data.description);
  formBody.append("price", data.price);
  formBody.append("quantity", data.quantity);
  formBody.append("status", data.status);
  if (data.image !== null) {
    formBody.append("image", data.image);
  }

  return await axios
    .post(`/product/add`, formBody)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const editProductAPI = async (data, id) => {
  const formBody = new FormData();
  formBody.append("product_name", data.product_name);
  formBody.append("description", data.description);
  formBody.append("price", data.price);
  formBody.append("quantity", data.quantity);
  formBody.append("status", data.status);
  if (data.image !== null) {
    formBody.append("image", data.image);
  }

  return await axios
    .put(`/product/edit/${id}`, formBody)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const getProductDetails = async (id) => {
  return await axios
    .get(`/product/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const deleteProductAPI = async (id) => {
  return await axios
    .delete(`/product/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export {
  getProductList,
  addProductAPI,
  editProductAPI,
  getProductDetails,
  deleteProductAPI,
};
