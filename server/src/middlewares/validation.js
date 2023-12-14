import { validationResult, body, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../helpers/errors.js";
import User from "../models/user.js";
import Todo from "../models/todo.js";
import { isValidObjectId } from "mongoose";

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

        if (errorTexts.includes("not authorized")) {
          throw new UnauthorizedError(errorTexts);
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

export const valCreateTodo = withValidationErrors([
  body("task").trim().notEmpty().withMessage("task is required"),
]);

export const valTodoIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new Error("invalid mongodb id");

    const todo = await Todo.findById(id).lean();
    if (!todo) throw new Error(`todo doesn't exist with id: ${id}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === todo.author.toString();

    if (!isAdmin && !isOwner) {
      throw new Error("not authorized to access this route");
    }
  }),
]);
