import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";

const FooterPage = () => {
  // const [topproducts, settopproducts] = useState([]);
  const [topcats, settopcats] = useState([]);
  const [topbrands, settopbrands] = useState([]);
  useEffect(() => {
    // axios.get('http://localhost:5000/products/topproducts')
    //   .then((res) => {
    //     settopproducts(res.data);
    //   })
    axios.get('http://localhost:5000/products/topcats')
      .then((res) => {
        settopcats(res.data);
      })
    axios.get('http://localhost:5000/products/topbrands')
      .then((res) => {
        settopbrands(res.data);
      })
  }, []);
  return (
    <MDBFooter className="footer bg-dark text-light font-small pt-4 mb-0">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">GO-SHOP</h5>
            <p>
              Here you can buy any thing you want any time.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title d-flex justify-content-center">Top Brands</h5>
            {topbrands.map(brand =>
              <Link key={Math.ceil(Math.random() * 100000)} className="text-light d-flex justify-content-center" to={'brand/' + brand._id}>{brand.name}</Link>
            )}
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title d-flex justify-content-center">Top categories</h5>
            {topcats.map(cat =>
              <Link key={Math.ceil(Math.random() * 100000)} className="text-light d-flex justify-content-center" to={'category/' + cat._id}>{cat.name}</Link>
            )}

          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <Link to="#!" className="text-light"> GO-SHOP </Link>
        </MDBContainer>
      </div>
    </MDBFooter >
  );
}

export default FooterPage;