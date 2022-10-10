import { Formik, Field, Form, ErrorMessage } from "formik";
import LoginValidation from "../../../validations/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/actions/index";
import loginApi from "../../../api/login";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div className="container">
          <h2 className="mt-3 text-center">Login</h2>
          <div className="row mt-3 ">
            <div className="col-md-4"></div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginValidation}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const dataToSend = {
                  email: values.email,
                  password: values.password,
                };
				  const res = await loginApi(dataToSend);
				  
                if (res.status === 200) {
                  dispatch(loginAction(res.data));
                  localStorage.setItem("accessToken", res.data.token || "");
                  alert(JSON.stringify(res.message));
                  navigate("/dashboard");
                  resetForm();
                } else {
                  alert(JSON.stringify(res.message));
                }
                setSubmitting(false);
              }}
              render={({ values, isSubmitting }) => (
                <Form className="col-md-4 g-3 card">
                  <div className="card-body">
                    <div className="mb-3 ">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
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

export default Login;
