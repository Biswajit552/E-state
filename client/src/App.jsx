import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  SignIn,
  SignUp,
  Profile,
  CreateListing,
  UpdateListing,
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
        <Route path="/about" element={<About />} />
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
