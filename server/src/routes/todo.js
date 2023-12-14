import { Router } from "express";
import {
  createTodo,
  deleteOneTodo,
  editTodo,
  editTodoStatus,
  getAllTodo,
  getTodoById,
} from "../controllers/todo.js";
import { valCreateTodo, valTodoIdParam } from "../middlewares/validation.js";

const router = Router();

router.route("/").get(getAllTodo).post(valCreateTodo, createTodo);
router
  .route("/:id")
  .get(valTodoIdParam, getTodoById)
  .patch(valTodoIdParam, editTodo)
  .delete(valTodoIdParam, deleteOneTodo);
router.patch("/status/:id", valTodoIdParam, editTodoStatus);

export default router;

// not authorized to access this route
