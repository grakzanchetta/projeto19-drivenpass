import joi from "joi";

export const noteCreationSchema = joi.object({
  noteTag: joi.string().required(),
  text: joi.string().required(),
});
