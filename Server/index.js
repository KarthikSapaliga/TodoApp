import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.clear();
  console.log(`listening on port ${PORT}`);
});
