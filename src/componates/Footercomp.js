import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
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
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
          </MDBCol>
          <MDBCol md="3">
          <h5 className="title d-flex justify-content-center">Top categories</h5>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
            <a className="text-light d-flex justify-content-center" href="#!">Links</a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="#!" className="text-light"> GO-SHOP </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;