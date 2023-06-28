import joi from "joi";

export const createUserSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(6),
  name: joi.string().required(),
  birthday: joi.string().required(),
  imgProfileUrl: joi.string().required(),
});
