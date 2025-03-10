import express from "express";
import {
  getAllTodos,
  getTodo,
  updateTodo,
  addTodo,
  deleteTodo,
} from "../controllers/todo.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllTodos);
router.post("/", verifyToken, addTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.put("/:id", verifyToken, updateTodo);
router.get("/:id", verifyToken, getTodo);

export default router;
