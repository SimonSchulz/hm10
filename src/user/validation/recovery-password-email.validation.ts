import { body } from "express-validator";

export const recoveryPasswordEmailValidation = body("email")
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage("email is not correct");
