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
