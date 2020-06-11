import React from 'react';
import ProductCardComp from './ProductCardComp';
import NavBarcomp from './NavBarcomp';
import Footercomp from './Footercomp';


const Products = () => {

    return (
        <div className="container flex m-0 col-12 p-0">
            <NavBarcomp />
            <div className="main">
                <div className="container col-12 row justify-content-center">
                    <ProductCardComp productid="aaaa" productName="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" productDetails="vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" productPrice="100000" userid="1"/>
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"productPrice="100000" userid="1"/>
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                    <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                </div>
            </div>
            <Footercomp />
        </div>
    );
}

export default Products;