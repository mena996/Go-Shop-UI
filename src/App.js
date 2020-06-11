import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./componates/adminPanel/Admin";
import NavBarcomp from "./componates/NavBarcomp";
import Footercomp from "./componates/Footercomp";
import ProductCardComp from "./componates/ProductCardComp";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(null);
  const providerValue = { user, setUser };

  return (
    <UserContext.Provider value={providerValue}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>

      {/* <div className="container flex m-0 col-12 p-0"> 
       <NavBarcomp /> 
       <Footercomp />
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
    </div> */}
    </UserContext.Provider>
  );
}

export default App;
