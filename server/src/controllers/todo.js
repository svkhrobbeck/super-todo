import { StatusCodes } from "http-status-codes";
import Todo from "../models/todo.js";

export const getAllTodo = async (req, res) => {
  // const page = +(req.query?.page || 1);
  // const limit = +(req.query?.limit || null);

  // const skip = (page - 1) * limit;
  const author = req.user.userId;

  const all_todo = await Todo.find({ author })
  // .skip(skip).limit(limit);
  const total_todo = await Todo.countDocuments({ author });

  res.status(StatusCodes.OK).json({ all_todo, total_todo });
};

export const createTodo = async (req, res) => {
  const body = { author: req.user.userId, task: req.body.task };
  const todo = await Todo.create(body);

  res.status(StatusCodes.CREATED).json({ todo });
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.status(StatusCodes.OK).json({ todo });
};

export const editTodo = async (req, res) => {
  const { task, status } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task, status },
    { new: true }
  );

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
