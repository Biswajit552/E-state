import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFromData] = useState({
    imageURL: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [filePerc, setFilePerc] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setIamgeUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);
  const handelImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageURL.length < 7) {
      setUploading(true);
      setIamgeUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFromData({
            ...formData,
            imageURL: formData.imageURL.concat(urls),
          });
          setIamgeUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setIamgeUploadError("image upload failed");
          setUploading(false);
        });
    } else {
      setIamgeUploadError("you can only upload 6 images per listing");
      setUploading(false);
      setTimeout(() => {
        setIamgeUploadError(false);
      }, 3000);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handelRemoveImage = (index) => {
    setFromData({
      ...formData,
      imageURL: formData.imageURL.filter((_, i) => i !== index),
    });
  };

  const handelChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFromData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFromData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFromData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageURL.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discounrPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handelSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-3xl "
            id="name"
            maxLength="50"
            minLength="3"
            required
            onChange={handelChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-3xl "
            id="description"
            required
            onChange={handelChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-3xl "
            id="address"
            required
            onChange={handelChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handelChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handelChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handelChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handelChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handelChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-400 rounded-lg"
                onChange={handelChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-400 rounded-lg"
                onChange={handelChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="500"
                max="1000000000"
                required
                className="p-2 border border-gray-400 rounded-lg"
                onChange={handelChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="100000"
                  required
                  className="p-2 border border-gray-400 rounded-lg"
                  onChange={handelChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">(₹ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-700 ml-2">
              The First iamge will cover (max 6)
            </span>{" "}
          </p>
          <div className="flex gap-4">
            <input
              className="p-2 border border-gray-300 rounded w-full"
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handelImageSubmit}
              className="p-2 bg-green-700 text-white rounded-lg  uppercase border border-black"
            >
              {uploading ? `${filePerc}%` : "Upload"}
            </button>
          </div>
          {/* <p>
            {imageUploadError ? (
              <span className="text-red-700">error Image uploade</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`uploading..  ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600" >
                Image Successfully uploaded
              </span>
            ) : (
              ""
            )}
          </p> */}
          <p className=" text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageURL.length > 0 &&
            formData.imageURL.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing images"
                  className="w-30 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handelRemoveImage(index)}
                  className="p-3 text-base bg-red-600 text-white rounded-lg"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          <button
            disabled={uploading || loading}
            className="p-2 bg-slate-800 text-white rounded-lg uppercase hover:bg-green-600"
          >
            {loading ? "creating..." : " Create Listing"}
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  );
}
