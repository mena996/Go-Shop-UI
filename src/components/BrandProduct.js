import React, { useState } from 'react';
import ProductCardComp from './ProductCardComp';
import NavBarcomp from './NavBarcomp';
import Footercomp from './Footercomp';
import { UserContext, SearchContext } from '../App';
import { fetchDataUNAuth } from './adminPanel/helpers';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const BrandProduct = (props) => {
    const id = props.match.params.id;
    const [productsData, setProductsData] = React.useState({ products: [], loading: false });
    const [productsDataFiltered, setProductsDataFiltered] = React.useState({ products: [], loading: false });
    const { search } = React.useContext(SearchContext);
    //user state
    const { user } = React.useContext(UserContext);
    const user_id = user ? user._id : null;
    const [toggleUpdate, setToggleUpdate] = React.useState(false);
    const [brands, setbrands] = useState([]);
    const [brand, setbrand] = useState([]);


    React.useEffect(() => {
        //setting loading to true
        setProductsData({ ...productsData, loading: true })
        fetchDataUNAuth(`brands/${id}/products`).then(res => {
            setProductsData({ ...productsData, products: res });
            setProductsDataFiltered({ ...productsDataFiltered, products: res.filter((product) => (product.name.includes(search))) });
        });
        //setting loading to false
        setProductsData({ ...productsData, loading: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps

        Axios.get('http://localhost:5000/brands')
            .then((res) => {
                setbrands(res.data.filter((brand) => brand._id != id));
            })
        Axios.get(`http://localhost:5000/brands/${id}`)
            .then((res) => {
                setbrand(res.data);
            })
    }, [id]);

    return (
        <div className="container flex m-0 col-12 p-0">
            <NavBarcomp />
            <div className="row col-12 m-0 p-0">
                <div className="card col-sm-7 col-xl-2 col-md-4 m-3 ">
                    <article className="card-group-item">
                        <header className="card-header">
                            <h6 className="title">other brands</h6>
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
                <div className="main container col-sm-4 col-xl-9 col-md-7 justify-content-center">
                    <h3 className="col-10 mt-3 mr-1 pl-0">brand:{brand.data ? brand.data.name : "loading"}</h3>
                    <div className="container col-12 row justify-content-center">
                        {productsDataFiltered.products.map((product, index) => <ProductCardComp key={Math.ceil(Math.random() * 100000)} product={product} userid={user_id} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />)}
                    </div>
                </div>
            </div>

            <Footercomp />
        </div>
    );
}

export default BrandProduct;