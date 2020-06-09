import React from 'react';
import './App.css';
import NavBarcomp from './componates/NavBarcomp';
import Footercomp from './componates/Footercomp';
import ProductCardComp from './componates/ProductCardComp';

function App() {
  return (
    <div className="container flex m-0 col-12 p-0">
      {/* <NavBarcomp /> */}
      {/* <Footercomp /> */}
      <div className="row col-12 justify-content-center">
      <ProductCardComp productid="aaaa" productName="aaaaaaaaaaaaaaaaaaaaaaaaaaaa" productDetails="vvvvvvvvvvvvvvvvvvvvvvvvvv" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" productPrice="100000"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>
      <ProductCardComp productid="aaaa" productName="aaaa" productDetails="aaaa" productImage="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"/>

      </div>
    </div>
  );
}

export default App;
