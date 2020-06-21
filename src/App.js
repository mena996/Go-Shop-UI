import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./components/adminPanel/Admin";
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import Product from "./components/product";
import Categories from "./components/Categories";
import Brands from "./components/Brands";
import CategoryProduct from "./components/CategoryProduct";
import BrandProduct from "./components/BrandProduct";
import Favorite from "./components/Favorite";

export const UserContext = React.createContext(null);
export const SearchContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")) || null);
  const providerValue = { user, setUser };
  const [ search, setSearch] = React.useState([]);
  const searchProviderValue = { search, setSearch };

  return (
    <UserContext.Provider value={providerValue}>
      <SearchContext.Provider value={searchProviderValue}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorite" component={Favorite} />
          {/* <Route path="/admin" component={Admin} /> */}
          <Route path="/category/:id" component={CategoryProduct} />
          <Route path="/categories" component={Categories} />
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={Product} />
          <Route path="/brands" component={Brands} />
          <Route path="/brand/:id" component={BrandProduct} />
        </Switch>
      </BrowserRouter>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
