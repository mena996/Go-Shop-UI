import React, { useState } from "react";
import NavBarcomp from "./NavBarcomp";
import FooterPage from './Footercomp';
import { UserContext, SearchContext } from "../App";
import Carousel from 'react-bootstrap/Carousel'
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { fetchDataUNAuth } from "./adminPanel/helpers";
import ProductCardComp from "./ProductCardComp";
import { Link } from "react-router-dom";

const Home = () => {
  const mainImages = ['https://cms.souqcdn.com/cms/boxes/img/desktop/L_1558612074_EG_W_EIDMubarak_MB_TVS_EN.jpg',
    'https://placeimg.com/850/350/tech',
    'https://cms.souqcdn.com/cms/boxes/img/desktop/L_1558619165_EG_W_GW_MB_HUAWEIY9PRIME_970x400_EN.jpg',
    'https://cms.souqcdn.com/cms/boxes/img/desktop/L_1558529865_HP_MB_SamsungM10_970x400p-en.jpg'];
  const addsImgs = ['https://cms.souqcdn.com/spring/cms/en/ae/2019_LP/kindle/egypt/eg-kindledevice-search-banner-en.png', 'https://cms.souqcdn.com/sanfronto/eg/2018/Web/Banners/HP-Strip/September/CIB-en.jpg']
  const [brands, setbrands] = useState([]);
  const [productsData, setProductsData] = React.useState({ products: [], loading: false });
  const { user } = React.useContext(UserContext);
  const user_id = user ? user._id : null;
  const [toggleUpdate, setToggleUpdate] = React.useState(false);
  const [topcats, settopcats] = useState([]);
  React.useEffect(() => {
    setProductsData({ ...productsData, loading: true })
    fetchDataUNAuth('products/topproducts').then(res => {
      setProductsData({ ...productsData, products: res });
    });
    //setting loading to false
    setProductsData({ ...productsData, loading: false })

    Axios.get('http://localhost:5000/products/topcats')
      .then((res) => {
        settopcats(res.data);
      })

    Axios.get('http://localhost:5000/brands')
      .then((res) => {
        setbrands(res.data.slice(0, 10));
      })
  }, []);
  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />

      <div className="container col-12 pt-0 pl-5 pr-5">
        <Carousel className="ml-sm-0 mr-xm-0 mt-xm-5 mb-sm-5  m-lg-5">
          {mainImages.map((img) =>
            <Carousel.Item key={Math.ceil(Math.random() * 100000)}>
              <img
                className="d-block w-100"
                src={img}
                alt="First slide"
                height="400"
              />
              <Carousel.Caption>
                {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, Link pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        <img className="img-fluid row justify-content-center m-auto" src={addsImgs[0]} />

        <div className="row mt-4 ml-0 mr-0 mb-4">
          <div className="owl-title"><h3>Best Products</h3></div>
          <div className="owl-carousel">
            <div className="col-12 h-100 row justify-content-center">




              {productsData.products.slice(0, 7).map((product) =>
                <div className="owl-item cloned active row ml-3" key={Math.ceil(Math.random() * 100000)}>
                  <ProductCardComp className="products-card" product={product} userid={user_id} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />
                </div>
              )}





            </div>
          </div>
        </div>


        <img className="img-fluid row justify-content-center m-auto" src={addsImgs[1]} />

        <div className="row mt-4 ml-0 mr-0 mb-4">
          <div className="owl-title"><h3>Best Categories</h3></div>
          <div className="owl-carousel">


            <div className="row justify-content-center">
              <div className="col-12 col-md-3 row side-img">
                <div className="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <Link to={topcats[1] ? `/category/${topcats[1]._id}` : ""}>
                    <img className="img-fluid" src={topcats[1] ? topcats[1].image : ""} />
                    <div className="centered text-dark text-truncate">{topcats[1] ? topcats[1].name : ""}</div>
                  </Link>
                </div>
                <div className="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <Link to={topcats[2] ? `/category/${topcats[2]._id}` : ""}>
                    <img className="img-fluid" src={topcats[2] ? topcats[2].image : ""} />
                    <div className="centered text-dark text-truncate">{topcats[2] ? topcats[2].name : ""}</div>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <Link to={topcats[0] ? `/category/${topcats[0]._id}` : ""}>
                  <img className="img-fluid" src={topcats[0] ? topcats[0].image : ""} width="605" height="440" />
                  <div className="centered text-dark text-truncate">{topcats[0] ? topcats[0].name : ""}</div>
                </Link>
              </div>
              <div className="col-12 col-md-3 row side-img">
                <div className="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <Link to={topcats[3] ? `/category/${topcats[3]._id}` : ""}>
                    <img className="img-fluid" src={topcats[3] ? topcats[3].image : ""} />
                    <div className="centered text-dark text-truncate">{topcats[3] ? topcats[3].name : ""}</div>
                  </Link>
                </div>
                <div className="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <Link to={topcats[4] ? `/category/${topcats[4]._id}` : ""}>
                    <img className="img-fluid" src={topcats[4] ? topcats[4].image : ""} />
                    <div className="centered text-dark text-truncate">{topcats[4] ? topcats[4].name : ""}</div>
                  </Link>
                </div>
              </div>
            </div>



          </div>
        </div>








      </div>

      <FooterPage />
    </div >
  );
};

export default Home;
