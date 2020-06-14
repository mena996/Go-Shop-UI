import React from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';

const Categories = () => {
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">Categories</div>
      <FooterPage />
    </div>
  );
};

export default Categories;
