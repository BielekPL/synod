import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {ProtectedPage} from "./hooks/AuthContext";


import "../stylesheets/seller.css";
import { Outlet } from "react-router-dom";

// const authUser

export default function SellerRoot() {
  return (
    <>
      <Navbar target="seller" />
      <div className="main-wrapper seller">
        {/* <Aside /> */}
        <main id="main-content">
          <ProtectedPage>
          <Outlet id="main-content" />
          </ProtectedPage>
        </main>
      </div>
      <Footer />
    </>
  );
}
