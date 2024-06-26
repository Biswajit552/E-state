import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import gsap from "gsap";
import SearchHome from "./SearchHome";
import MyLocation from "./MyLocation";
import BestMobile from "./BestMobile";
import { asset43, asset48, asset51, asset54 } from "../assets";
import ContactUs from "./ContactUs";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const comp = useRef(null);
  const month = Date().slice(4, 15);
  console.log(month);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=6");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from(["#hero"], {
        opacity: 0,
        x: -100,
        duration: 1.2,
        delay: 0.4,
      })
        .from("#swiper", {
          opacity: 0,
          x: -100,
          duration: 1.2,
          delay: 0.3,
        })
        .from("#para", {
          opacity: 0,
          x: -100,
          duration: 1.0,
        });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <div className="mt-14">
      {/* top */}

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[300px] hover:scale-105 ease-in-out duration-300 cursor-pointer"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="hidden md:block mx-[350px]  -mt-16 absolute   z-10  w-[800px] ">
        <SearchHome />
      </div>
      <div className="mt-20 w-full items-center text-center">
        <h1 className="text-gray-500 font-serif p-2">
          GET STARTED WITH EXPLORING REAL ESTATE OPTIONS
        </h1>
        <BestMobile />
      </div>
      {/* <div
        className="flex flex-col gap-6 md:mt-10 p-10 px-3 max-w-6xl mx-auto overflow-hidden"
        ref={comp}
      >
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl" id="hero">
          Find your next <span className="text-slate-500">perfect</span>
        </h1>
        <h1
          className="text-slate-700 font-bold text-3xl lg:text-6xl"
          id="swiper"
        >
          place with <span className="text-slate-500">ease</span>
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm" id="para">
          Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div> */}
      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-around">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-around">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-around">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex    mx-auto justify-center">
        <div className="w-[600px]">
          <img src={asset48} alt="asset48" className="p-5" />
        </div>
        <div className="text-left my-28 leading-10 ">
          <p className="text-slate-400 font-bold">POST YOUR PROPERTY</p>
          <h1 className="font-serif font-bold text-3xl  space-x-3 tracking-wider">
            Register to post your <br /> property for
            <span className="bg-green-600 text-white text-xl px-2 rounded-md py-1">
              FREE
            </span>
          </h1>
          <h1 className="font-serif text-gray-600 text-base tracking-wider mt-4 mb-5">
            Sell or rent your residential/commercial property
          </h1>
          <Link className="text-white font-bold  text-base text-center  bg-blue-600 px-4 py-2 rounded-md ">
            Post Your Perpoty FREE
          </Link>
        </div>
      </div>
      <div className="flex w-[60%] z-20 ml-80 -mt-24 bg-white p-5 rounded-xl justify-evenly mx-auto absolute ">
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">
            Articles and guides <br /> for property <br />
            owners{" "}
          </h1>
          <p className="text-sm text-gray-500">
            Reads from Beginners check-list to pro Tips
          </p>
        </div>
        <div className="leading-10 ">
          <div className="mb-3 flex text-xs gap-2">
            <img src={asset43} alt="" className="w-28 rounded-xl" />
            <p>
              How to Find Vastu Dosh in <br /> House ? <br />
              <span className="text-zinc-700">{month}</span>
            </p>
          </div>
          <div className="mb-3 flex text-xs gap-2">
            <img src={asset51} alt="" className="w-28 rounded-xl" />
            <p>
              Guide to Property Tax Online <br />
              Payment in Udupi ? <br />
              <span className="text-zinc-700">{month}</span>
            </p>
          </div>
          <p>Read realty news,guides & articles </p>
        </div>
        <div className="leading-10 ">
          <div className="mb-3 flex text-xs gap-2">
            <img src={asset43} alt="" className="w-28 rounded-xl" />
            <p>
              How to Find Vastu Dosh in <br /> House ? <br />
              <span className="text-zinc-700">{month}</span>
            </p>
          </div>
          <div className="mb-3 flex text-xs gap-2">
            <img src={asset51} alt="" className="w-28 rounded-xl" />
            <p>
              Guide to Property Tax Online <br />
              Payment in Udupi ? <br />
              <span className="text-zinc-700">{month}</span>
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center mt-32 text-slate-700 text-3xl font-bold">
        Our services{" "}
      </h1>
      <div>
        <ContactUs />
      </div>
    </div>
  );
}
