import joi from "joi";

export const userCreationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
