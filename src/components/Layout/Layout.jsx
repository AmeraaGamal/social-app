import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container p-5 my-4">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}