//username, password

import React, { FormEvent, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

interface LoginDetails {
  username: string;
  password: string;
}

const Login = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: "",
    password: "",
  });

  const { login, loading } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginDetails);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Login to Just.Tek
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-5 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
