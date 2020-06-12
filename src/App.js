import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./components/adminPanel/Admin";
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import Product from "./components/product";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(null);
  const providerValue = { user, setUser };

  return (
    <UserContext.Provider value={providerValue}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          {/* <Route path="/admin" component={Admin} /> */}
          {/* <Route path="/category/:id" component={CategoryProduct} /> */}
          {/* <Route path="/categories" component={Categories} /> */}
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={Product} />
          {/* <Route path="/brands" component={Brands} /> */}
          {/* <Route path="/brand/:id" component={Brand} /> */}
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
