const { Joi, celebrate } = require("celebrate");

const PRODUCT_SCHEMA = {
  ADD_PRODUCT: celebrate({
    body: Joi.object({
      product_name: Joi.string()
        .trim()
        .regex(/^[a-zA-Z0-9 ]*$/)
        .min(2)
        .max(50)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Product Name is Required";
                break;
              case "string.min":
                err.message = `Product Name accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Product Name accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Product Name";
                break;
            }
          });
          return errors;
        }),
      description: Joi.string().trim().max(250),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      status: Joi.number().required(),
      image: Joi.object(),
    }).options({ abortEarly: true, allowUnknown: true }),
  }),
};

module.exports = { PRODUCT_SCHEMA };
