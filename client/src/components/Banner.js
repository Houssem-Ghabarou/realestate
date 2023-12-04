import { useEffect, useState } from "react";
import banner from "../banner.jpg";
import backgroundVilla from "../assets/bg.webp";
import Search from "./Search";
import Header from "./Header";
const Banner = () => {
  return (
    <div
      className="banner d-flex align-items-center"
      style={{ backgroundImage: `url(${backgroundVilla})` }}
    >
      <div className="bg-custom">
        <Header />

        <div className="container">
          <div className="row">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
