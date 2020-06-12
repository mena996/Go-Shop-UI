import React from "react";
import Favoritecomp from "./Favoritecomp";

const ProductCardComp = ({ product, userid }) => {
//  console.log(product);
  return (
    <div className="pcard card m-3">
      <img className="card-img" src={product.image[0]} alt="product" width="200px" height="200px" />
      <div className="card-img-overlay d-flex justify-content-end h-25">
        <div className="card-link like">
          <Favoritecomp productid={product._id} userid={userid} />
        </div>
      </div>
      <div className="card-body">
        <a href={'product/'+product._id}>
          <h4 className="card-title text-truncate">{product.name}</h4>
        </a>
  <h6 className="card-subtitle mb-2 text-muted">category: {product.category.name}</h6>
        <p className="card-text  text-truncate">{product.description}</p>
        <div className="justify-content-between align-items-center">
          <div className="price text-success"><h5 className="mt-0">{product.price} L.E</h5></div>
          <a href="#!" className="btn btn-danger float-right mt-0"><i className="fa fa-shopping-cart"></i> Add to Cart</a>
        </div>
      </div>
    </div>
  );
}

export default ProductCardComp;