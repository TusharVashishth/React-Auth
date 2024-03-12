import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("The auth state", authState);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full md:w-[500px] rounded-xl shadow-lg bg-white p-4">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Welcome back</p>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="h-10 p-2 w-full outline-none border rounded-lg"
              placeholder="Type your email.."
              id="email"
              value={authState.email}
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="h-10 p-2 w-full outline-none border rounded-lg"
              placeholder="Type your password.."
              id="password"
              value={authState.password}
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <button className="w-full h-10 rounded-lg bg-black text-white">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>-- OR --</p>
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
