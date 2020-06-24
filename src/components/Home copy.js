import React, { useState } from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import { UserContext, SearchContext } from "../App";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { fetchDataUNAuth } from "./adminPanel/helpers";
import ProductCardComp from "./ProductCardComp";
import { Link } from "react-router-dom";

const Home = () => {
  // const [productsData, setProductsData] = React.useState({ products: [], loading: false });
  // const [productsDataFiltered, setProductsDataFiltered] = React.useState({ products: [], loading: false });
  //user state
  // const [cats, setcats] = useState([]);
  const [brands, setbrands] = useState([]);

  React.useEffect(() => {
    // //setting loading to true
    // setProductsData({ ...productsData, loading: true })
    // fetchDataUNAuth('products').then(res => {
    //   setProductsData({ ...productsData, products: res });
    //   setProductsDataFiltered({ ...productsDataFiltered, products: res });
    // });
    // //setting loading to false
    // setProductsData({ ...productsData, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Axios.get('http://localhost:5000/categories')
    //   .then((res) => {
    //     setcats(res.data);
    //   })
    Axios.get('http://localhost:5000/brands')
      .then((res) => {
        setbrands(res.data.slice(0, 10));
      })
  }, []);
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="row col-12 m-0 p-0">
        <div className="card col-sm-7 col-xl-2 col-md-4 m-3 ">
          <article className="card-group-item">
            <header className="card-header">
              <h6 className="title">brands</h6>
            </header>
            <div className="filter-content">
              <div className="card-body">
                  {brands.map((brand, index) =>
                    <label className="form-check" key={Math.ceil(Math.random() * 100000)}>
                      <Link className="form-check-label" to={"/brand/" + brand._id}>
                        <img src={brand.image} alt="product" width="30px" height="30px" />
                        <span className="ml-2">
                          {brand.name}
                        </span>
                      </Link>
                    </label>
                  )}
              </div>
            </div>
          </article>
        </div>
        <div className="container col-sm-12 col-xl-9 col-md justify-content-center">
          <div className="container col-10 justify-content-center mt-5 mb-5">
            <img src="http://localhost:5000/public/mainPhoto.jpg" className="img-fluid" alt="product" />
          </div>
          {/* <div className="container col-12 row justify-content-center">
            {productsDataFiltered.products.map((product, index) => <ProductCardComp product={product} userid={user_id} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />)}
          </div> */}
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default Home;
