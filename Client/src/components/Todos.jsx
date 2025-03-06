import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import EditTodo from "./EditTodo";
import Profile from "./Profile";

import { Trash2 } from "lucide-react";
import { Check } from "lucide-react";
import { Plus } from "lucide-react";

const fetcher = (url, options = {}) =>
  fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json());

export const Todos = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:8000/api/todos",
    fetcher
  );
  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");

    if (!title.trim().length) {
      toast.error("Todo can't be empty!");
      return;
    }

    const newTodo = {
      title: `adding "${title}"`,
      _id: Date.now().toString(),
      isCompleted: false,
    };

    await mutate(
      async () => {
        const res = await fetcher("http://localhost:8000/api/todos", {
          method: "POST",
          body: { title },
        });
        if (res.error) {
          toast.error(res.error);
          throw new Error(res.error);
        }
        return [...data, res];
      },
      {
        optimisticData: [...data, newTodo],
        revalidate: true,
        rollbackOnError: true,
      }
    );
    e.target.reset();
  };

  const handleDeleteTodo = async (id) => {
    const updatedTodos = data.filter((todo) => todo._id != id);

    await mutate(
      async () => {
        console.log(id);
        const res = await fetcher(`http://localhost:8000/api/todos/${id}`, {
          method: "DELETE",
        });

        if (res.error) {
          toast.error(res.error + `\n id: ${id}`);
          throw new Error();
        }

        toast.success("Todo deleted!");
        return updatedTodos;
      },
      {
        optimisticData: updatedTodos,
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const handleCompleted = async (id, isCompleted) => {
    await mutate(
      async () => {
        const res = await fetcher(`http://localhost:8000/api/todos/${id}`, {
          method: "PUT",
          body: { isCompleted: !isCompleted },
        });

        if (res.error) {
          toast.error(res.error + `\n id: ${id}`);
          throw new Error();
        }

        return data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, isCompleted: !isCompleted };
          } else return todo;
        });
      },
      {
        optimisticData: data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, isCompleted: !isCompleted };
          } else return todo;
        }),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const handleUpdate = async (formData) => {
    const title = formData.get("title");
    const id = formData.get("id");

    await mutate(
      async () => {
        const res = await fetcher(`http://localhost:8000/api/todos/${id}`, {
          method: "PUT",
          body: { title: title },
        });

        if (res.error) {
          toast.error(res.error + `\n id: ${id}`);
          throw new Error();
        }

        return data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, title: title };
          } else return todo;
        });
      },
      {
        optimisticData: data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, title: title };
          } else return todo;
        }),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  return (
    <div className="mx-auto mt-20 max-w-lg w-full flex flex-col gap-6">
      <div>
        <Profile />
      </div>
      <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text">
        Todo App
      </h1>
      <form onSubmit={handleAddTodo} className="flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Enter todo"
          name="title"
          id="title"
          className="shadcn-md"
          required
        />
        <Button type="submit">
          <Plus size={20} />
        </Button>
      </form>
      <div className="flex flex-col shadow-md border-input bg-transparent rounded">
        {data.map((todo) => {
          return (
            <div
              key={todo._id}
              className="flex items-center w-full h-10 border rounded"
            >
              <span
                className={`flex-1 px-3 ${
                  todo.isCompleted && "line-through text-[#63657b]"
                }`}
              >
                {todo.title}
              </span>
              <div className="px-3 flex gap-2">
                <EditTodo
                  title={todo.title}
                  id={todo._id}
                  handleUpdate={handleUpdate}
                />
                <Trash2
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="icon-hover"
                />
                <Check
                  className={`icon-hover ${
                    todo.isCompleted && "text-primary fill-slate-300"
                  }`}
                  onClick={() => handleCompleted(todo._id, todo.isCompleted)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
