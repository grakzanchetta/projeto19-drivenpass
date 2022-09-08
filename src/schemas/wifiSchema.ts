import joi from "joi";

export const wifiCreationSchema = joi.object({
  wifiTag: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});
