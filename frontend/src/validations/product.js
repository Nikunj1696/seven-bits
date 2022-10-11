import * as Yup from "yup";

const productSchema = Yup.object({
  product_name: Yup.string()
    .required("Product name is required")
    .min(5, "Minimum ${min} characters required")
    .max(100, "Must be ${max} characters or less"),
  description: Yup.string()
    .required("Product Description is Required")
    .max(100, "Must be ${max} characters or less"),
  price: Yup.number().required("Price is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  status: Yup.number().required("Status is Required"),
});

export { productSchema };
