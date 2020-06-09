import React from "react";

const ProductCardComp = ({ productid, productName, productDetails, productImage,productPrice }) => {
  return (
    <a href={`/products/${productid}`}>
      <div className="card m-2 text-dark">
        <img className="card-img-top" src={productImage} alt="Card cap" height="150" />
        <div className="card-body">
          <h5 className="card-title text-truncate">{productName}</h5>
          <p className="card-text text-truncate">{productDetails}</p>
          <p className="card-text text-truncate">{productPrice} L.E</p>
        </div>
      </div>
    </a>
  );
}

export default ProductCardComp;