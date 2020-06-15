import React from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import { UserContext } from "../App";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { user, setUser } = React.useContext(UserContext);
  // const user_id = user ? user.user._id : null;
  // if (user){
  //   return <Redirect to="/products"/>
  // }
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">home</div>
      <FooterPage />
    </div>
  );
};

export default Home;
