<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}
=======
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movies List */}
        <Route path="/movies" element={<Movies />} />

        {/* 🔥 IMPORTANT: SeatLayout must come BEFORE MovieDetails */}
        <Route path="/movies/:id/:date" element={<SeatLayout />} />

        {/* Movie Details */}
        <Route path="/movies/:id" element={<MovieDetails />} />

        {/* Other Pages */}
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};
>>>>>>> 66bfd2733d653bbcd8576c81809900ab96a0eea5

export default App;