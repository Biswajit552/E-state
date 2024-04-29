import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/Signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=" w-screen h-[94vh]   bg-cover flex Home mt-14">
      {/*content box */}
      <div className="flex flex-col items-center w-[100%]  h-full backdrop-blur-sm  p-4 px-4 gap-4">
        {/*welcome*/}
        <p className="text-3xl font-semibold  text-headingColor font-serif">
          Welcome Back
        </p>

        {/*input section*/}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p> Don't Have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-200 cursor-pointer underline">
              Sign up
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
    // <div className="flex flex-row w-full items-center">
    //   <div className="p-3 max-w-lg mx-auto mt-14 w-[40%]">
    //     <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //       <input
    //         type="email"
    //         placeholder="email"
    //         className="border p-3 border-slate-600  rounded-full"
    //         id="email"
    //         onChange={handleChange}
    //       />
    //       <input
    //         type="password"
    //         placeholder="password"
    //         className="border p-3 border-slate-600  rounded-full"
    //         id="password"
    //         onChange={handleChange}
    //       />

    //       <button
    //         disabled={loading}
    //         className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    //       >
    //         {loading ? "Loading..." : "Sign In"}
    //       </button>
    //       <OAuth />
    //     </form>
    //     <div className="flex gap-2 mt-5">
    //       <p> Don't Have an account?</p>
    //       <Link to={"/sign-up"}>
    //         <span className="text-blue-700">Sign up</span>
    //       </Link>
    //     </div>
    //     {error && <p className="text-red-500 mt-5">{error}</p>}
    //   </div>
    // </div>
  );
}
