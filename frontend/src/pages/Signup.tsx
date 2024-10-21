// fullName, username, email, password, confirmPassword, gender

import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckBox from "../components/GenderCheckBox";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckBoxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = () => {
    alert(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Signup to Just.Tek
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs?.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e?.target?.value })
              }
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="johnDoe"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs?.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e?.target?.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="jon.doe@mail.com"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs?.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs?.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e?.target?.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 px-3 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs?.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e?.target?.value })
              }
            />
          </div>

          {/* Gender Checkbox */}
          <div className="mb-4">
            <GenderCheckBox
              onCheckBoxChange={handleCheckBoxChange}
              selectedGender={inputs?.gender}
            />
          </div>

          {/* Already have an account link */}
          <Link
            to={"/login"}
            className="text-sm text-gray-300 hover:underline hover:text-blue-400 mt-5 block text-center"
          >
            Already have an account?
          </Link>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
