import React, { useEffect, useState } from "react";

const OwnnerData = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  console.log(landlord);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="text-center gap-4 flex mx-auto justify-center duration-1000 delay-500  ">
          <img src={landlord.avatar} alt="" className=" w-60 rounded-full" />
          <div className="my-auto">
            <h2 className="text-xl text-slate-800">
              Owner name :- {landlord.username}
            </h2>
            <p className="text-sm">
              Property id:-{" "}
              <span className="text-blue-600 underline">{landlord._id}</span>{" "}
            </p>
            <p>Email:-{landlord.email}</p>
            <p>Address :- {listing.address}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnnerData;
