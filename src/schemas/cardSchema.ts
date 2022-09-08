import joi from "joi";

export const cardCreationSchema = joi.object({
  cardTag: joi.string().required(),
  cardNumber: joi
    .string()
    .pattern(/^[0-9]{16}$/)
    .required(),
  cardName: joi.string().required(),
  cvc: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  expirationDate: joi.string().required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
});
