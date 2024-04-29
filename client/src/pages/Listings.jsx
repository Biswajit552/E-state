import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Listings = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  console.log(userListings);
  const [showListingsError, setShowListingsError] = useState(false);

  useEffect(() => {
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
    handelShowListings();
  }, []);

  return (
    <div className="mt-14">
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-mono font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex flex-row justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="md:h-48 md:w-48 h-16 w-16  object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p> Name :- {listing.name}</p>
                <p>Address :- {listing.address}</p>
                <p>{listing.description}</p>
              </Link>

              <div className="flex flex-col gap-2 item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className=" text-red-700 rounded-l md:text-3xl text-2xl"
                >
                  <MdDelete />
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase md:text-3xl text-2xl">
                    <BiSolidEditAlt />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
