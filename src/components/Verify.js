import React, { useState } from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import { Link } from "react-router-dom";
import Axios from "axios";

const Verify = ({ match: { params: { id } } }) => {
  const [varified, setVarified] = useState([]);
  React.useEffect(() => {
    Axios.get(`http://localhost:5000/users/verify/${id}`)
      .then((res) => {
        setVarified(res.data);
        console.log(res.data);

      })
  }, []);
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">
        <div className="container row col-12 justify-content-center">
          <h3 className="mt-5 pt-5">
            {varified == "done" ? "thank you for verifying your email you can login now." : "varifing your email please wait"}
          </h3>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Verify;
