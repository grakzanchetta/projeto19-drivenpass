import joi from "joi";

export const credentialCreationSchema = joi.object({
  credentialTag: joi.string().required(),
  url: joi.string().required(),
  title: joi.string().required(),
  password: joi.string().required(),
});
