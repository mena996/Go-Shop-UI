import React, { useState, useEffect } from "react";
import Axios from "axios";
import SignUpcomp from "./SignUpcomp";
import { Link, Redirect } from "react-router-dom";
import Login from "./Login";
import { UserContext, SearchContext } from "../App";
import { fetchData } from "./adminPanel/helpers";

const NavBarcomp = () => {
  const { search, setSearch } = React.useContext(SearchContext);
  const { user, setUser } = React.useContext(UserContext);
  const [preSearch, setPreSearch] = useState([]);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  const user_id = user ? user._id : null;



  const logout = () => {
    fetch('http://localhost:5000/auth/logout', { method: 'POST', credentials: 'include' }).then(res => {
      setUser();
    })
  }
  function changesearch() {
    setSearch(preSearch);
  }
  React.useEffect(() => {
    setPreSearch(search);
  }, []);
  fetchData('users/cart').then(res => setCartItemsCount(res.cart.length));
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
            {user && <li className="nav-item">
              <Link className="nav-link text-light" to="/orders">Orders</Link>
            </li>}
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <div className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2 col-7" type="search" placeholder="Search" value={preSearch} onChange={e => { const { target: { value } } = e; setPreSearch(value) }} />
              <Link className="btn btn-outline-light text-light my-2 my-sm-0 mr-1" type="submit" onClick={changesearch} to="/products">Search</Link>
            </div>
            {(user_id != null) ?
              <li className="nav-item">
                <h3>
                  <Link to="/cart" className="nav-link text-light text-truncate">
                    <i className="fa fa-shopping-cart"></i>
                    {cartItemsCount}
                  </Link>
                </h3>
              </li> : <></>
            }
            {(user_id == null) ?
              <li>
                <button type="button" className="btn btn-outline-light my-2" data-toggle="modal" data-target="#signUp">Sign Up</button>
              </li> : <></>
            }
            {(user_id == null) ?
              <li>
                <button type="button" className="btn btn-outline-dark bg-light my-2 ml-2" data-toggle="modal" data-target="#login">login</button>
              </li> : <></>
            }
            {(user_id != null) ?
              <li className="nav-item avatar dropdown">
                <Link className="nav-link dropdown-toggle container" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" to="#!">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar.jpg" width="35px" className="rounded-circle z-depth-0"
                    alt="avatar" />
                  <p className="text-light d-inline-block text-truncate mb-0 pl-1 pr-0 col-md-9" style={{maxWidth:"100px"}}>{user ? `${user.firstName}aaaaaaaaaaaaaaaaaaaaaaa` : ""}</p>
                </Link>
                <div className="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                  aria-labelledby="navbarDropdownMenuLink-55">
                  {(user_id == null) ? <button className="dropdown-item" data-toggle="modal" data-target="#login">Login</button> : <></>}
                  {(user_id != null) ? <Link className="dropdown-item" to="/wishlist">Wishlist</Link> : <></>}
                  {(user_id != null) ? <Link className="dropdown-item" to="/favorite">Favorites</Link> : <></>}
                  {(user_id != null) ? <Link className="dropdown-item" to="" onClick={() => logout()}>Logout</Link> : <></>}
                </div>
              </li> : ""}:
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
};

export default NavBarcomp;
