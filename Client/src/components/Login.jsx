import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "@/actions/userActions";

const Login = () => {
  const [state, setState] = useState({ success: null, error: null });
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const res = await login(formData);
    setState(res);
    setIsPending(false);

    if (res.success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center transform -translate-y-16">
      <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-6 text-transparent bg-clip-text">
        Todo App
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-xl w-full px-8"
      >
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {state.success && (
          <span className="message success-msg">
            {state.success} {"Redirecting..."}
          </span>
        )}

        {state.error && (
          <span className="message error-msg">{state.error}</span>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" /> Please wait
            </>
          ) : (
            "Login"
          )}
        </Button>

        <span className="test-[#63657b] text-center">
          Don't have an account?&nbsp;
          <Link to="/register" className="icon-hover">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
