import { Formik, Field, Form, ErrorMessage } from "formik";
import constants from "../../../utils/constants";
import RegisterValidation from "../../../validations/register";
import { useNavigate } from "react-router-dom";
import registerApi from "../../../api/register";

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="container">
          <h2 className="mt-3 text-center">Register</h2>
          <div className="row mt-3 ">
            <div className="col-md-4"></div>
            <Formik
              initialValues={{
                full_name: "",
                email: "",
                password: "",
              }}
              validationSchema={RegisterValidation}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const dataToSend = {
                  full_name: values.full_name,
                  email: values.email,
                  password: values.password,
                  type: constants.userType.admin,
                };
                const res = await registerApi(dataToSend);

                if (res.status === 201) {
                  alert(JSON.stringify(res?.message));
                  await resetForm();
                  navigate("/login");
                }
                if (res.status === 400) {
                  alert(JSON.stringify(res?.message));
                }
                await setSubmitting(false);
              }}
              render={({ isSubmitting }) => (
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
                      <label htmlFor="full_name" className="form-label">
                        Email address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                      <ErrorMessage
                        name="email"
                        className="text-danger"
                        component="small"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                      <ErrorMessage
                        name="password"
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
    </>
  );
};

export default Register;
