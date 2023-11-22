import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  Profile,
  CreateListing,
  UpdateListing,
  Listing,
  Search,
  About,
} from "./pages";
import Header from "./components/Header";
import PriviteRoute from "./components/PriviteRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PriviteRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
