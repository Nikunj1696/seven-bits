import * as Yup from "yup";

const registerSchema = Yup.object({
  full_name: Yup.string()
    .required("Full name is required")
    .min(5, "Minimum ${min} characters required")
    .max(100, "Must be ${max} characters or less"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Minimum ${min} characters required")
    .max(15, "Must be ${max} characters or less"),
});

export default registerSchema;
