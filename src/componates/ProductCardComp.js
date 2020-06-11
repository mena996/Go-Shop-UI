import React from "react";
import Favoritecomp from "./Favoritecomp";

const ProductCardComp = ({ productid, productName, productDetails, productImage, productPrice, userid }) => {
  return (
    <div className="pcard card m-3">
      <img className="card-img" src={productImage} alt="product" width="200px" height="200px" />
      <div className="card-img-overlay d-flex justify-content-end h-25">
        <div className="card-link like">
          <Favoritecomp productid={productid} userid={userid} />
        </div>
      </div>
      <div className="card-body">
        <a href={'product/'+productid}>
          <h4 className="card-title text-truncate">{productName}</h4>
        </a>
        {/* <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6> */}
        <p className="card-text  text-truncate">{productDetails}</p>
        <div className="justify-content-between align-items-center">
          <div className="price text-success"><h5 className="mt-0">{productPrice} L.E</h5></div>
          <a href="#!" className="btn btn-danger float-right mt-0"><i className="fa fa-shopping-cart"></i> Add to Cart</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCardComp;