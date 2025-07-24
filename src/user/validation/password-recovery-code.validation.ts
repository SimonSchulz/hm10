import { body } from "express-validator";

export const recoveryCodeValidation = body("recoveryCode")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("code is required")
  .isUUID(4)
  .withMessage("Invalid recovery code format");
