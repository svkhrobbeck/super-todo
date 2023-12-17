import { StatusCodes } from "http-status-codes";
import Todo from "../models/todo.js";

export const getAllTodo = async (req, res) => {
  const { search } = req.query;
  const author = req.user.userId;

  const task = new RegExp(search, "ig");

  const todoParams = { author, task };
  const total_todo = await Todo.countDocuments(todoParams);

  const all_todo = await Todo.find(todoParams);
  res.status(StatusCodes.OK).json({ all_todo, total_todo });
};

export const createTodo = async (req, res) => {
  const { task, details } = req.body;
  const body = { author: req.user.userId, task, details };

  const todo = await Todo.create(body);
  res.status(StatusCodes.CREATED).json({ todo });
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id).lean();
  res.status(StatusCodes.OK).json({ todo });
};

export const editTodo = async (req, res) => {
  const { task, status, details } = req.body;
  const body = { task, status, details };

  const todo = await Todo.findByIdAndUpdate(req.params.id, body, { new: true });
  res.status(StatusCodes.OK).json({ todo });
};

export const editTodoStatus = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id).lean();

  const status = todo.status ? false : true;
  const updated = await Todo.findByIdAndUpdate(id, { status }, { new: true });

  res.status(StatusCodes.OK).json({ todo: updated });
};

export const deleteOneTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: "todo deleted" });
};
