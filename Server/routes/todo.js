import express from "express";
import {
  getAllTodos,
  getTodo,
  updateTodo,
  addTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);
router.get("/:id", getTodo);

export default router;
