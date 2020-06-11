import React from 'react';
import './App.css';
import NavBarcomp from './componates/NavBarcomp';
import Footercomp from './componates/Footercomp';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './componates/Home';
import Cart from './componates/Cart';
import Products from './componates/Products';

function App() {
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            {/* <Route path="/admin" component={Admin} /> */}
            {/* <Route path="/category/:id" component={CategoryProduct} /> */}
            {/* <Route path="/categories" component={Categories} /> */}
            <Route path="/products" component={Products} />
            {/* <Route path="/product/:id" component={Product} /> */}
            {/* <Route path="/brands" component={Brands} /> */}
            {/* <Route path="/brand/:id" component={Brand} /> */}
          </Switch>
        </BrowserRouter>
      </div>
      <Footercomp />
    </div>
  );
}

export default App;
