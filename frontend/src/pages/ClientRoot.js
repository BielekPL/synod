import React from "react";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Footer from "./components/Footer";


import "../stylesheets/customer.css";
import { Outlet } from "react-router-dom";

export default function ClientRoot() {
  return (
    <>
      <Navbar target="customer" />
      <div className="main-wrapper">
        <Aside />
        <main id="main-content">
            <Outlet id="main-content" />
        </main>
      </div>
      <Footer />
    </>
  );
}
