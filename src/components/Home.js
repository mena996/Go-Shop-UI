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
  const [brands, setbrands] = useState([]);
  const [productsData, setProductsData] = React.useState({ products: [], loading: false });
  const { user } = React.useContext(UserContext);
  const user_id = user ? user._id : null;
  const [ toggleUpdate, setToggleUpdate ] = React.useState(false);

  React.useEffect(() => {
    setProductsData({ ...productsData, loading: true })
    fetchDataUNAuth('products/topproducts').then(res => {
      setProductsData({ ...productsData, products: res });
      console.log(res);

    });
    //setting loading to false
    setProductsData({ ...productsData, loading: false })


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
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        <img class="img-fluid row justify-content-center m-auto" src="https://cms.souqcdn.com/spring/cms/en/ae/2019_LP/kindle/egypt/eg-kindledevice-search-banner-en.png"/>

        <div className="row mt-4 ml-0 mr-0 mb-4">
          <div className="owl-title"><h3>Best Deals</h3></div>
          <div className="owl-carousel">
            <div className="col-12 h-100 row justify-content-center">




              {productsData.products.slice(0, 7).map((product) =>
                <div className="owl-item cloned active row ml-3" key={Math.ceil(Math.random() * 100000)}>
                  <ProductCardComp className="products-card" product={product} userid={user_id} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/>
                </div>
              )}





            </div>
          </div>
        </div>


        <img class="img-fluid row justify-content-center m-auto" src="https://cms.souqcdn.com/sanfronto/eg/2018/Web/Banners/HP-Strip/September/CIB-en.jpg"/>
       
        <div className="row mt-4 ml-0 mr-0 mb-4">
          <div className="owl-title"><h3>Best Categories</h3></div>
          <div className="owl-carousel">


            <div class="row justify-content-center">
              <div class="col-12 col-md-3 row side-img">
                <div class="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <a href="#!">
                    <img class="img-fluid" src="https://cms.souqcdn.com/sanfronto/eg/2019/Web/LPs/Laptops/Laptop-en-v2_02.jpg" />
                  </a>
                </div>
                <div class="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <a href="#!">
                    <img class="img-fluid" src="https://cms.souqcdn.com/sanfronto/eg/2019/Web/LPs/Laptops/Laptop-en-v2_06.jpg" />
                  </a>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <a href="#!">
                  <img class="img-fluid" src="https://alhasoob.smart-itbusiness.com/img/center.jpg" width="605" height="440" />
                </a>
              </div>
              <div class="col-12 col-md-3 row side-img">
                <div class="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <a href="#!">
                    <img class="img-fluid" src="https://cms.souqcdn.com/sanfronto/eg/2019/Web/LPs/Laptops/Laptop-en-v2_07.jpg" />
                    </a>
                </div>
                <div class="col-6 col-md-12 p-1 p-md-0 justify-content-center">
                  <a href="#!">
                    <img class="img-fluid" src="https://cms.souqcdn.com/sanfronto/eg/2019/Web/LPs/Laptops/Laptop-en-v2_04.jpg" />
                    </a>
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
