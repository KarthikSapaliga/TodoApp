import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

app.get("/", (req, res) => {
  res.send("root route");
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 505;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
