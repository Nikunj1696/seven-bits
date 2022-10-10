import * as Yup from "yup";

const validation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters required")
    .max(15, "Must be 15 characters or less")
    .required("Password is Required"),
});

export default validation;