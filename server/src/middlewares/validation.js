import { validationResult, body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../helpers/errors.js";
import User from "../models/user.js";

const withValidationErrors = validateValues => {
  return [
    ...validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        const errorTexts = errorMessages.join(", ");

        if (errorTexts.includes("doesn't exist")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorTexts.includes("credentials")) {
          throw new UnauthenticatedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const valRegister = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) throw new Error("email already exists");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const valLogin = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .custom(async email => {
      const user = User.findOne({ email });
      if (!user) throw new Error("invalid credentials");
    }),
  body("password").trim().notEmpty().withMessage("password is required"),
]);
