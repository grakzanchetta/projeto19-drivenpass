import joi from "joi";

export const userCreationAndLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
