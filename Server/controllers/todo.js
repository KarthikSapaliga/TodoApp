import { connectToDB } from "../utils/connect.js";
import Todo from "../models/todoModel.js";
import { createError } from "../utils/error.js";

// user is sent from the middleware

export async function getAllTodos(req, res, next) {
  await connectToDB();
  const todos = await Todo.find({ userId: req.user.id });
  if (!todos) {
    return next(createError(404, "todo not found"));
  }
  res.status(200).send(todos);
}

export async function getTodo(req, res, next) {
  await connectToDB();
  const todo = await Todo.findOne({ _id: req.params.id });
  if (!todo) {
    return next(createError(404, "todo not found"));
  }
  if (todo.userId.toString() !== req.user.id) {
    return next(createError(404, "not authorized"));
  }
  res.status(200).send(todo);
}

export async function updateTodo(req, res, next) {
  const data = req.body;
  if (!data) {
    return next(createError(404, "Missing fields!"));
  }
  try {
    await connectToDB();
    const todo = await Todo.findOne({ _id: req.params.id });
    if (todo.userId.toString() !== req.user.id) {
      return next(createError(403, "not authorized"));
    }
    todo.title = data.title || todo.title;
    if (data.isCompleted !== undefined) {
      todo.isCompleted = data.isCompleted;
    }
    todo.save();
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.log(error);
    return next(createError(404, "todo not found"));
  }
}

export async function addTodo(req, res, next) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = req.body;
  if (!data || !data.title) {
    return next(createError(404, "Title is required!"));
  }
  await connectToDB();
  const newtodo = new Todo({ title: data.title, userId: req.user?.id });
  await newtodo.save();
  res.status(201).json(newtodo);
}

export async function deleteTodo(req, res, next) {
  try {
    await connectToDB();
    const result = await Todo.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!result.deletedCount) {
      return next(createError(400, "todo not found"));
    }
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    return next(createError(400, "Todo not found"));
  }
}
