import Joi from "joi";

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9-@_]{8,20}$/)
      .required(),
  }),
};

export const registerSchema = {
  body: Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(10)
      .pattern(/[A-Za-z]/)
      .required(),
    lastName: Joi.string().min(3).max(10).required(),
    countryCode: Joi.string()
      .pattern(/^\+[1-9]{1}[0-9]{1,3}$/)
      .required(),
    phone: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9-@_]{8,20}$/)
      .required(),
  }),
};
