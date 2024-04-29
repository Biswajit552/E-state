import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing, share }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  console.log(share);
  console.log(landlord);
  const onChange = (e) => {
    setMessage(e.target.value);
  };

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
  console.log(listing);
  console.log(listing.name);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message to Email
          </Link>

          <Link
            className="bg-green-500 text-white p-3 text-center rounded-lg hover:opacity-95"
            to={`https://wa.me/${
              landlord.phone
            }?text=i am interested in your property  ${
              listing.name
            } %0a Address:- ${listing.address} %0a Price:- ${
              listing.regularPrice
            } %0a  photo:-${
              "https://staychoice-ysix.onrender.com/listing/" + listing._id
            }`}
            // data-action="share/whatsapp/share"
          >
            Share via Whatsapp to ${landlord.username}
          </Link>
        </div>
      )}
    </>
  );
}
