import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import constants from "../../utils/constants";
import { addUserSchema, editUserSchema } from "../../validations/user";
import { useNavigate, useParams } from "react-router-dom";
import { addUserAPI, editUserAPI, getUserDetails } from "../../api/users";

export default function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    if (id) getUser();
  }, []);
  const getUser = async () => {
    const getUserData = await getUserDetails(id);
    setUserDetails(getUserData.data);
  };
  return (
    <div>
      <div className="container">
        <h2 className="mt-3 text-center">{`${id ? "Edit" : "Add"}`} User</h2>
        <div className="row mt-3 ">
          <div className="col-md-4"></div>
          <Formik
            initialValues={{
              full_name: userDetails?.full_name ?? "",
              email: userDetails?.email ?? "",
              password: "",
              profile: null,
            }}
            enableReinitialize={true}
            validationSchema={id ? editUserSchema : addUserSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const dataToSend = {
                full_name: values.full_name,
                email: values.email,
                password: values.password,
                type: constants.userType.user,
                profile: values.profile ,
              };
              let res;
              if (id) {
                res = await editUserAPI(dataToSend, id);
              } else {
                res = await addUserAPI(dataToSend);
              }

              if (res.status === 201 || res.status === 200) {
                alert(JSON.stringify(res?.message));
                await resetForm();
                navigate("/users");
              }

              if (res.status === 400) {
                alert(JSON.stringify(res?.message));
              }
              await setSubmitting(false);
            }}
            render={({ isSubmitting, setFieldValue, values }) => (
              <Form className="col-md-4 g-3 card">
                <div className="card-body">
                  <div className="mb-3 ">
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="full_name"
                      className="form-control"
                      id="full_name"
                    />
                    <ErrorMessage
                      name="full_name"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                    />
                    <ErrorMessage
                      name="email"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                    />
                    <ErrorMessage
                      name="password"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editProfile" className="form-label">
                      Profile
                    </label>
                    <Field
                      type="file"
                      name="profile"
                      className="form-control"
                      id="editProfile"
                      value={""}
                      onChange={(e) => {
                        setFieldValue("profile", e.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="profile"
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
