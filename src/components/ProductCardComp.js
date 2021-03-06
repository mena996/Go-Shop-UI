import React from "react";
import Favoritecomp from "./Favoritecomp";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Cookies from 'js-cookie';

const ProductCardComp = ({ product, userid, toggleUpdate, setToggleUpdate }) => {

  const addToCart = async () => {
    const cartItem = {
      product: product._id,
      price: product.price,
      quantity: 1
    }
    fetch('http://localhost:5000/users/cart', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(cartItem)
    }).then(res => {
      if (res.status === 200) {
        setToggleUpdate(!toggleUpdate);
        alert('Product was added successfully to your cart');
      } else alert("Couldn't add product to cart");
    })
  }

  const addToWishlist = async () => {
    fetch('http://localhost:5000/users/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({product: product._id})
    }).then(res => {
      if (res.status === 200) {
        setToggleUpdate(!toggleUpdate);
        alert('Product was added successfully to your wishlist');
      } else alert("Couldn't add product to your wishlist");
    })
  }

  const cartItems = Cookies.getJSON('userData')?.cart?.map((item) => item?.product);
  const wishlistItems = Cookies.getJSON('userData')?.wishlist;

  return (
    <div className="pcard card m-3 " >
      <img className="card-img" src={product.image[0]} alt="product" width="200px" height="200px" />
      <div className="card-img-overlay d-flex justify-content-end h-25">
        <div className="card-link like">
          <Favoritecomp productid={product._id} userid={userid} />
        </div>
      </div>
      <div className="card-body">
        <Link to={'/product/' + product._id}>
          <h4 className="card-title text-truncate">{product.name}</h4>
        </Link>
        {product.category.name ?<Link to={'/category/' + product.category._id}> <h6 className="card-subtitle mb-2 text-muted">category: {product.category.name}</h6></Link> : ""}
        <p className="card-text  text-truncate">{product.description}</p>
        <div className="justify-content-between align-items-center">
          <div className="price text-success"><h5 className="mt-0">{product.price} L.E</h5></div>
          { userid && !cartItems?.includes(product._id) && <Button color='default' style={{ backgroundColor: '' }} className="bg-dark text-light btn btn-danger float-right mt-0" onClick={() => addToCart()}><i className="fa fa-shopping-cart mr-2"></i> Add to Cart</Button>}
          { userid && !wishlistItems?.includes(product._id) && <Button color='default' style={{ backgroundColor: '' }} className="bg-dark text-light btn btn-danger float-right m-1" onClick={() => addToWishlist()}> Add to Wishlist</Button>}
        </div>
      </div>
    </div>
  );
}

export default ProductCardComp;