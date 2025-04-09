import Joi from "joi";
import validator from "express-joi-validation";


export const validate = validator.createValidator({});

const authSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

export const loginSchema = Joi.object({
  ...authSchema
});

export const registerSchema = Joi.object({
  username: Joi.string().min(6).required(),
  ...authSchema
});

export const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().valid('electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing', 'other').required()
});