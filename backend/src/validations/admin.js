const { Joi, celebrate } = require("celebrate");

const ADMIN_SCHEMAS = {
  SIGNUP: celebrate({
    body: Joi.object({
      full_name: Joi.string()
        .trim()
        .regex(/^[a-zA-Z ]*$/)
        .min(2)
        .max(50)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Full Name is Required";
                break;
              case "string.min":
                err.message = `Full Name accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Full Name accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Full Name";
                break;
            }
          });
          return errors;
        }),
      email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Email is Required";
                break;
              default:
                err.message = "Please enter valid Email";
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Password is Required";
                break;
              case "string.min":
                err.message = `Password accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Password accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Password";
                break;
            }
          });
          return errors;
		}),
	  type: Joi.number().required()
    }).options({ abortEarly: true, allowUnknown: true }),
  }),
  LOGIN: celebrate({
    body: Joi.object({
      email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Email is Required";
                break;
              default:
                err.message = "Please enter valid Email";
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .trim()
        .min(6)
        .max(15)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "any.required":
                err.message = "Password is Required";
                break;
              case "string.min":
                err.message = `Password accept minimum ${err.local.limit} character.`;
                break;
              case "string.max":
                err.message = `Password accept maximum ${err.local.limit} character.`;
                break;
              default:
                err.message = "Please enter valid Password";
                break;
            }
          });
          return errors;
        }),
    }).options({ abortEarly: true, allowUnknown: true }),
  }),
};

module.exports = { ADMIN_SCHEMAS };
