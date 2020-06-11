import React, { useState, useEffect } from "react";
import Axios from "axios";
import SignUpcomp from "./SignUpcomp";
import { Link } from "react-router-dom";

const NavBarcomp = ({ userid }) => {
  // const [loved, setloved] = useState([]);
  // useEffect(() => {
  //   if (productid && userid) {
  //   Axios.get(`http://localhost:5000/products/favorite/${userid}/${productid}`)
  //     .then((res) => {
  //       // console.log(res.data[0].rate);
  //       try {
  //        if(res.data[0])
  //         setloved(true);
  //        else
  //          setloved(false);
  //       } catch (error) {
  //         setloved(false);
  //       }

  //     })
  //   }
  // }, []);


  // const changerate = (e) => {
  //   const { target: { className } } = e
  //   setloved(!loved);
  //   console.log(className);
  //   Axios.post('http://localhost:5000/products/favorite', { "user": userid, "product": productid }).then((messages) => { console.log(messages); });
  // }
  // if (userid) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark col-12 sticky-top">
        <a className="navbar-brand text-light" href="#">GO-SHOP</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link text-light" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/brands">Brands</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/categories">Categories</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>
            <li className="nav-item">
              <h3>
                <a href="/cart" className="nav-link text-light text-truncate">
                  <i className="fa fa-shopping-cart"></i>
                5
              </a>
              </h3>
            </li>
            <li>
              <button type="button" className="btn btn-outline-light my-2" data-toggle="modal" data-target="#signUp">Sign Up</button>
            </li>
            <li className="nav-item avatar dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" href="#!">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar.jpg" width="35px" className="rounded-circle z-depth-0"
                  alt="avatar" />
              </a>
              <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                aria-labelledby="navbarDropdownMenuLink-55">
                <button className="dropdown-item" data-toggle="modal" data-target="#login">Login</button>
                <a className="dropdown-item" href="#!">wishlist</a>
                <a className="dropdown-item" href="#!">logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <SignUpcomp />
    </>
  )
  // }
};

export default NavBarcomp;
