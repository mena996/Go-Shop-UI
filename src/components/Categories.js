import React, { useState } from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import Axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setcategories] = useState([]);
  React.useEffect(() => {
    Axios.get('http://localhost:5000/categories')
      .then((res) => {
        setcategories(res.data);
      })
  }, []);
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">
        <h2 className="m-3">Categories</h2>
        <div className="container row col-12 justify-content-center">


          {categories.map((category) =>
            <div className="card col-sm-7 col-xl-2 col-md-4 m-3 " key={category._id}>
              <img className="card-img-top" src={category.image} height="200"  alt="brand" />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <Link to={"/category/" + category._id} className="btn btn-primary">show products</Link>
              </div>
            </div>
          )}


        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Categories;
