import React from "react";
import Favoritecomp from "./Favoritecomp";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { checkAccessTokenExpiry } from "../components/adminPanel/helpers";

const ProductCardComp = ({ product, userid, toggleUpdate, setToggleUpdate }) => {

const addToCart = async() => {
  const cartItem = {
    product: product._id,
    price: product.price,
    quantity: 1
  }
  await checkAccessTokenExpiry();
  fetch('http://localhost:5000/users/cart', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(cartItem)
  }).then(res => {
    if (res.status === 200) {
      setToggleUpdate(!toggleUpdate);
      alert('Product was added successfully');
     } else alert("Couldn't add product to cart");
  })
}

  return (
    <div className="pcard card m-3" >
      <img className="card-img" src={product.image[0]} alt="product" width="200px" height="200px" />
      <div className="card-img-overlay d-flex justify-content-end h-25">
        <div className="card-link like">
          <Favoritecomp  productid={product._id} userid={userid} />
        </div>
      </div>
      <div className="card-body">
        <Link to={'product/'+product._id}>
          <h4 className="card-title text-truncate">{product.name}</h4>
        </Link>
  <h6 className="card-subtitle mb-2 text-muted">category: {product.category.name}</h6>
        <p className="card-text  text-truncate">{product.description}</p>
        <div className="justify-content-between align-items-center">
          <div className="price text-success"><h5 className="mt-0">{product.price} L.E</h5></div>
          <Button color='default' style={{backgroundColor:'grey'}} className="btn btn-danger float-right mt-0" onClick={() => addToCart()}><i className="fa fa-shopping-cart mr-2"></i> Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCardComp;