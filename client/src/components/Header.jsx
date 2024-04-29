import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineLocationOn } from "react-icons/md";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [add, setAdd] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      // console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
  }, []);
  const handelSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 fixed w-full top-0 z-30 ">
      <div className="flex  justify-around items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">stay</span>
            <span className="text-slate-700">Choice</span>
          </h1>
        </Link>
        <p className="flex items-center gap-2  cursor-pointer border-white border-2 p-1 rounded-3xl bg-white">
          {add.city}
          <MdOutlineLocationOn className="text-blue-600 text-xl" />
        </p>
        {/* <form
          onSubmit={handelSubmit}
          className="bg-slate-100 p-2 rounded-2xl flex items-center  hidden block "
        >
          <input
            type="text"
            placeholder="search any City & Place Name.... "
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <button>
            <FaSearch className="text-slate-700" />
          </button>
        </form> */}
        <ul className="flex gap-4 items-center">
          <Link to="/create-listing">
            <div class="style__postContainer flex items-center  bg-white rounded-xl font-serif p-1">
              <div class="style__post">Post property</div>
              <div class="fre__outerwrap mt-1">
                FREE<div class="fre__innerwrap"></div>
              </div>
            </div>
          </Link>

          <Link to="/show-listings">
            <div class="style__postContainer flex items-center  bg-white rounded-xl font-serif p-1">
              <div class="fre__outerwrap mt-1">
                My-Listings<div class="fre__innerwrap"></div>
              </div>
            </div>
          </Link>
          <Link to="/about">
            <li className="hidden  font-bold sm:inline text-slate-800 hover:underline ">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="prifile"
                className="rounded-full h-9 w-9 object-cover"
              />
            ) : (
              <li className="  font-bold sm:inline text-slate-800 hover:underlin">
                Sign-In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
