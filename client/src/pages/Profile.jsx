import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserfailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handelUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handelUpload(file);
    }
  }, [file]);

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      dispatch(updateUserfailure(error.message));
    }
  };

  const handelDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handelUserSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handelShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  //firebase Storage
  // allow read;
  // allow write:if
  // request.resource.size<2 *1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handelSubmit} className="flex flex-col  gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar} //click image change rule formData.avatar || currentUser.avatar
          alt="profile"
          onClick={() => fileRef.current.click()} //link input file
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center  mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">error Image uploade</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading..  ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border border-slate-500  rounded-full p-3"
          id="username"
          onChange={handelChange}
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border border-slate-500  rounded-full p-3 "
          id="email"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-slate-500  rounded-full p-3 "
          id="password"
          onChange={handelChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-full uppercase text-center hover:opacity-95 "
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handelDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handelUserSignOut}
          className="text-red-700 cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <p className="text-green-600 mt-5">
        {updateSuccess ? "update Successfully" : ""}{" "}
      </p>
      <p className="text-red-600 mt-5">{error ? error : ""}</p>
      <button onClick={handelShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "error showing listings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageURL}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete=
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
