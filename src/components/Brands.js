import React from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';

const Brands= () => {
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">brands</div>
      <FooterPage />
    </div>
  );
};

export default Brands;
