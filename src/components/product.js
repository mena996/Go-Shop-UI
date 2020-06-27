import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Reviews from './Reviews';
import ReviewForm from './Reviewform';
import { UserContext } from "../App";
import Popup from "reactjs-popup";
import Ratecomp from './Ratecomp';
import ProductRate from './RateResults';
import FooterPage from './Footercomp';
import NavBarcomp from './NavBarcomp';
import Favoritecomp from './Favoritecomp';
import { Button } from '@material-ui/core';


const Product = ({ match: { params: { id } } }) => {
    const [ toggleUpdate, setToggleUpdate ] = React.useState(false);
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
                alert('Product was added successfully');
            } else alert("Couldn't add product to cart");
        })
    }
    const [product, setProduct] = useState({ product: {}, error: null, isloaded: false })
    const [reviews, setReviews] = useState({ reviews: [], error: null, isloaded: false })
    const { user } = React.useContext(UserContext);
    const user_id = user ? user._id : null
    const [open, setOpen] = useState(false)


    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setProduct({ product: result, error: null, isloaded: true })
                },
                (error) => {
                    setProduct({ product: {}, error: error, isloaded: true })
                }
            )

        fetch(`http://localhost:5000/reviews/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setReviews({ reviews: result, error: null, isloaded: true })
                },
                (error) => {
                    setReviews({ reviews: [], error: error, isloaded: true })
                }
            )
    }, [])

    const submitHandler = (text, mode, product_id) => {
        if (!user_id) {
            setOpen(true)
        } else {
            switch (mode) {
                case "add":
                    fetch("http://localhost:5000/reviews",
                        {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                review: text,
                                product: id,
                                user: user_id,
                            }),
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setReviews({ reviews: [...reviews.reviews, result], error: null, isloaded: true })
                            },
                            (error) => {
                                alert("cannot add review! something went wrong\nnote:'You cannot send empty review'")
                            })
                    break
                case "edit":
                    fetch(`http://localhost:5000/reviews/${product_id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                review: text
                            }),
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                const newRev = reviews.reviews.map(review => {
                                    if (review._id == result._id) review = result
                                    return review
                                })
                                setReviews({ reviews: newRev, error: null, isloaded: true })
                            },
                            (error) => {
                                alert("cannot edit this reviw! something went wrong\nnote:'You cannot send empty review'")
                            })
                    break;
                default:
                    break;
            }
        }
    }


    const deleteHandler = (id) => {
        fetch(`http://localhost:5000/reviews/${id}`, { method: "delete" })
            .then(res => res.json())
            .then(
                (result) => {
                    const newRev = reviews.reviews.filter(review => review._id != result._id)
                    setReviews({ reviews: newRev, error: null, isloaded: true })
                },
                (error) => {
                    alert("something went wrong")
                })
    }
    // ------------ render
    console.log(product.isloaded);

    if (product.error) {
        return <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}> 404|Error </div>
    }
    else if (!product.isloaded) {
        return <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>Loading... </div>
    } else {
        return (
            <div className="container flex m-0 col-12 p-0">
                <NavBarcomp />
                <div className="main">
                    <div className="container">
                        { product.product.available && ( <>
                        <Popup
                            open={open}
                            modal
                            closeOnDocumentClick
                            onClose={() => setOpen(false)}>
                            <>
                                <Link className="close" onClick={() => setOpen(false)}>&times;</Link>
                                <div className="container p-2">
                                    <h5 className="text-center">WARNNING </h5>
                                    <hr />
                                    <p>You have to Login first</p>
                                    <hr />
                                    <div className="text-center">
                                        <NavLink activeClassName="btn btn-info mr-2" to="/"> Login page </NavLink>
                                        <button className="btn btn-dark ml-2" onClick={() => setOpen(false)}>Close</button>
                                    </div>
                                </div>
                            </>
                        </Popup>
                        <div>
                            <div className="col-12 mt-3">
                                <div className="card">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img className="card-img-top p-2" src={product.product.image} style={{ height: "100%" }} alt="Product" />
                                        </div>

                                        <div className="card-body">
                                            <div className="row container">
                                                <h4 className="card-title col-10">{product.product.name}</h4>
                                                {/* <div className="col-xl-4 col-md-5 col-sm-12">
                                                    <Ratecomp productid={id} userid={user_id} />
                                                </div> */}
                                                <div className="col-1">
                                                    <Favoritecomp productid={product.product._id} userid={user_id} />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="card-text">
                                                {/* <strong>By : </strong> &nbsp;<Link to={`/author/${product.product.author._id}`}>{product.product.author.firstName}&nbsp;{product.product.author.lastName}</Link> */}
                                                <strong>Price : </strong> &nbsp;{product.product.price}
                                                <br />
                                                <strong>Category : </strong> &nbsp;<Link to={`/category/${product.product.category._id}`}>{product.product.category.name}</Link>
                                                <br />
                                                <strong>Brand : </strong> &nbsp;<Link to={`/brand/${product.product.brand._id}`}>{product.product.brand.name}</Link>
                                                <br />
                                                <ProductRate id={id} />
                                                <div className="float-right">
                                                    <Button onClick={() => addToCart()} color='default' style={{ backgroundColor: '' }} className="bg-dark text-light btn btn-danger mt-0"><i className="fa fa-shopping-cart mr-2"></i> Add to Cart</Button>
                                                </div>
                                            </div>
                                            <p className="card-text">
                                                {product.product.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* reviews section */}
                        {/* review form */}
                        <div className="card  mt-5">
                            <div className="card-header">
                                <div className="row">
                                    <div className="ml-3">
                                        Add your review review
                                    </div>
                                    <div className="col-xl-4 col-md-5 col-sm-12">
                                        <Ratecomp productid={id} userid={user_id} />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <ReviewForm submitHandler={submitHandler} review="" mode="add" id="" />
                            </div>
                        </div>

                        {/* reviews */}
                        <div className="card  mt-5 mb-5">
                            <div className="card-header">Product's reviews</div>
                            <div className="card-body">
                                <Reviews reviews={reviews} submitHandler={submitHandler} deleteHandler={deleteHandler} user={user_id} />
                            </div>
                        </div>
                        </>)}
                        {!product.product.available && <h3 className='p-5 m-5'>Product isn't available</h3>}
                    </div>
                </div>
                <FooterPage />
            </div>
        );
    }

}


export default Product;