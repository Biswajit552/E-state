import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function OAuth() {
  const handelGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("could not signin with google ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handelGoogleClick}
      className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 flex flex-wrap justify-center items-center gap-1"
    >
      continue with google
      <span className="text-2xl">
        <FcGoogle />
      </span>
    </button>
  );
}
