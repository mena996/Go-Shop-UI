import React from "react";
import NavBarcomp from "./NavBarcomp";
import Footercomp from './Footercomp';

const Home = () => {
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">home</div>
      <Footercomp />
    </div>
  );
};

export default Home;
