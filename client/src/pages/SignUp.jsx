import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" w-screen h-[94vh]   bg-cover flex bg-[url('src/assets/sign.jpg')] mt-14">
      {/*content box */}
      <div className="flex flex-col items-center w-[100%]  h-full backdrop-blur-sm  p-4 px-4 gap-4">
        {/*welcome*/}
        <p className="text-3xl font-semibold  text-headingColor font-serif">
          Welcome Back
        </p>

        {/*input section*/}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label>Phone No :- </label>
            <input
              type="number"
              placeholder="Phone Number"
              className=" p-3 rounded-2xl"
              id="phone"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>UserName :- </label>
            <input
              type="test"
              placeholder="username"
              className=" p-3 rounded-2xl"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email :- </label>
            <input
              type="email"
              placeholder="email"
              className=" p-3 ml-7 rounded-2xl"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password :- </label>
            <input
              type="password"
              placeholder="password"
              className=" p-3  rounded-2xl"
              id="password"
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p> Don't Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-200 cursor-pointer underline">
              Sign In
            </span>
          </Link>
        </div>

        <div className=" flex items-center justify-center gap-16">
          <div className=" w-24 h-[1px] rounded-md  bg-orange-500  "></div>
          <p className=" text-green-500">OR</p>
          <div className=" w-24 h-[1px] rounded-md  bg-orange-500   "></div>
        </div>

        <OAuth />
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
