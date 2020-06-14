import React, { useState, useEffect } from "react";
import Axios from "axios";
import SignUpcomp from "./SignUpcomp";
import { Link } from "react-router-dom";
import Login from "./Login";
import { UserContext } from "../App";

const NavBarcomp = () => {
  const { user, setUser } = React.useContext(UserContext);
  const user_id = user ? user._id : null;

  const logout = () => {
    fetch('http://localhost:5000/users/logout').then( res => {
    setUser();
    localStorage.clear();
    })
   }

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
        <Link className="navbar-brand text-light" to="/">GO-SHOP</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link text-light" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/categories">Categories</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-light my-2 my-sm-0 mr-1" type="submit">Search</button>
            </form>
            {(user_id != null) ?
              <li className="nav-item">
                <h3>
                  <Link to="/cart" className="nav-link text-light text-truncate">
                    <i className="fa fa-shopping-cart"></i>
                {user.cart.length}
              </Link>
                </h3>
              </li> : <></>
            }
            {(user_id == null) ?
              <li>
                <button type="button" className="btn btn-outline-light my-2" data-toggle="modal" data-target="#signUp">Sign Up</button>
              </li> : <></>
            }

            <li className="nav-item avatar dropdown">
              <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" to="#!">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar.jpg" width="35px" className="rounded-circle z-depth-0"
                  alt="avatar" />
              </Link>
              <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                aria-labelledby="navbarDropdownMenuLink-55">
                {(user_id == null)?<button className="dropdown-item" data-toggle="modal" data-target="#login">Login</button>:<></>}
                {(user_id != null)?<Link className="dropdown-item" to="#!">wishlist</Link>:<></>}
                {(user_id != null)?<Link className="dropdown-item" to="" onClick={() => logout()}>logout</Link>:<></>}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <SignUpcomp />
      <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered p-3">
          <div className="modal-content">
            <div className="container">
              <Login isAdmin={false} UserContext={UserContext} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
  // }
};

export default NavBarcomp;
