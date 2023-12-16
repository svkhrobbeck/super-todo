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
import { comparePass } from "../helpers/password.js";

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

        if (errorTexts.includes("password is empty")) {
          throw new BadRequestError(
            "Password is empty! please first set password"
          );
          return;
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
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("invalid credentials");
    }),
  body("password").trim().notEmpty().withMessage("password is required"),
]);

export const valUserUpdate = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email }).lean();
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("name").trim().notEmpty().withMessage("name is required"),
]);

export const valUpdatePassword = withValidationErrors([
  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("old password is required")
    .custom(async (password, { req }) => {
      const user = await User.findById(req.user.userId).lean();

      if (user.password === null) {
        throw new Error("Password is empty! Please first set password");
      } else {
        const isMatch = await comparePass(password, user.password);
        if (!isMatch) throw new Error("old password is wrong");
      }
    }),
  body("password").trim().notEmpty().withMessage("password is required"),
  body("comfirmPassword")
    .trim()
    .notEmpty()
    .withMessage("comfirm password is required")
    .custom(async (comfirmPassword, { req }) => {
      if (comfirmPassword.trim() !== req.body.password.trim())
        throw new Error("comfirm password is wrong");
    }),
]);

export const valSetPassword = withValidationErrors([
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .custom(async (password, { req }) => {
      const user = await User.findById(req.user.userId).lean();

      if (user.password !== null) throw new Error("password already setted");
    }),
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
