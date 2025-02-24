export async function getAllTodos(req, res, next) {
  res.send("get all todos");
}

export async function getTodo(req, res, next) {
  res.send(`get todo : ${req.params.id}`);
}

export async function updateTodo(req, res, next) {
  res.send(`update todo : ${req.params.id}`);
}

export async function addTodo(req, res, next) {
  res.send("add todo");
}

export async function deleteTodo(req, res, next) {
  res.send(`delete todo : ${req.params.id}`);
}
