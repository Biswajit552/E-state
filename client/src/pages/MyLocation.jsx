import React, { useState, useEffect } from "react";

function MyLocation() {
  const [add, setAdd] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
  }, []);
  console.log(add, "sfsfh");

  return (
    <div>
      <h1>{add.city}</h1>
    </div>
  );
}

export default MyLocation;
