import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { productSchema } from "../../validations/product";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProductAPI,
  editProductAPI,
  getProductDetails,
} from "../../api/products";

export default function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (id) getProduct();
  }, []);

  const getProduct = async () => {
    const getProductData = await getProductDetails(id);
    setProductDetails(getProductData.data);
  };
  return (
    <div>
      <div className="container">
        <h2 className="mt-3 text-center">{`${id ? "Edit" : "Add"}`} Product</h2>
        <div className="row mt-3 ">
          <div className="col-md-4"></div>
          <Formik
            initialValues={{
              product_name: productDetails?.product_name ?? "",
              description: productDetails?.description ?? "",
              price: productDetails?.price ?? "",
              quantity: productDetails?.quantity ?? "",
              status: productDetails?.status ?? "",
              image: null,
            }}
            enableReinitialize={true}
            validationSchema={productSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const dataToSend = {
                product_name: values.product_name ?? "",
                description: values.description ?? "",
                price: values.price ?? 0,
                quantity: values.quantity ?? 0,
                status: values.status ?? 0,
                image: values.image ?? null,
              };
              let res;
              if (id) {
                res = await editProductAPI(dataToSend, id);
              } else {
                res = await addProductAPI(dataToSend);
              }

              if (res.status === 201 || res.status === 200) {
                alert(JSON.stringify(res?.message));
                await resetForm();
                navigate("/products");
              }

              if (res.status === 400) {
                alert(JSON.stringify(res?.message));
              }
              await setSubmitting(false);
            }}
            render={({ isSubmitting, setFieldValue }) => (
              <Form className="col-md-4 g-3 card">
                <div className="card-body">
                  <div className="mb-3 ">
                    <label htmlFor="product_name" className="form-label">
                      Product Name
                    </label>
                    <Field
                      type="text"
                      name="product_name"
                      className="form-control"
                      id="product_name"
                    />
                    <ErrorMessage
                      name="product_name"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Field
                      type="text"
                      as="textarea"
                      name="description"
                      className="form-control"
                      id="description"
                      aria-describedby="description"
                    />
                    <ErrorMessage
                      name="description"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <Field
                      type="number"
                      name="price"
                      className="form-control"
                      id="price"
                    />
                    <ErrorMessage
                      name="price"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <Field
                      type="number"
                      name="quantity"
                      className="form-control"
                      id="quantity"
                    />
                    <ErrorMessage
                      name="quantity"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <Field
                      type="text"
                      as="select"
                      name="status"
                      className="form-control"
                      id="status"
                    >
                      <option value={0}>Inactive</option>
                      <option value={1}>Active</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <Field
                      type="file"
                      name="image"
                      className="form-control"
                      id="image"
                      value=""
                      onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="image"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-primary "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}
