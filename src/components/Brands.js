import React, { useState } from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import { Link } from "react-router-dom";
import Axios from "axios";

const Brands = () => {
  const [brands, setbrands] = useState([]);
  React.useEffect(() => {
    Axios.get('http://localhost:5000/brands')
      .then((res) => {
        setbrands(res.data);
      })
  }, []);
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">
        <h2 className="m-3">Brands</h2>
        <div className="container row col-12 justify-content-center">


          {brands.map((brand) =>
            <div className="card col-sm-7 col-xl-2 col-md-4 m-3" key={brand._id}>
              <img className="card-img-top" src={brand.image} height="200"  alt="brand" />
              <div className="card-body">
                <h5 className="card-title">{brand.name}</h5>
                <p className="card-text">{ brand.description }</p>
                <Link to={"/brand/" + brand._id} className="btn btn-primary">show products</Link>
              </div>
            </div>
          )}


        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Brands;
