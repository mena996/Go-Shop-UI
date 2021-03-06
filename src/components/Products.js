import React, { useState } from 'react';
import ProductCardComp from './ProductCardComp';
import NavBarcomp from './NavBarcomp';
import Footercomp from './Footercomp';
import { UserContext, SearchContext } from '../App';
import { fetchDataUNAuth } from './adminPanel/helpers';
import Axios from 'axios';

let brandsfilter = [], catsfilter = [];
const Products = () => {
    const [productsData, setProductsData] = React.useState({ products: [], loading: false });
    const [productsDataFiltered, setProductsDataFiltered] = React.useState({ products: [], loading: false });
    const { search } = React.useContext(SearchContext);
    //user state
    const { user } = React.useContext(UserContext);
    const user_id = user ? user._id : null;
    const [ toggleUpdate, setToggleUpdate ] = React.useState(false);
    const [cats, setcats] = useState([]);
    const [brands, setbrands] = useState([]);
    const [searchfilter, setSearchfilter] = useState([]);


    React.useEffect(() => {
        //setting loading to true
        setProductsData({ ...productsData, loading: true })
        fetchDataUNAuth('products/available').then(res => {
            setProductsData({ ...productsData, products: res });
            setProductsDataFiltered({ ...productsDataFiltered, products: res.filter((product) => (product.name.includes(search))) });
        });
        //setting loading to false
        setProductsData({ ...productsData, loading: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Axios.get('http://localhost:5000/categories')
            .then((res) => {
                setcats(res.data);
            })
        Axios.get('http://localhost:5000/brands')
            .then((res) => {
                setbrands(res.data);
            })
    }, [productsData.loading]);

    if (search != searchfilter ) {
        setSearchfilter(search);
        filter();
        
    }


    function filterBrand(e) {
        if (e.target.checked) {
            brandsfilter.push(e.target.value);
        }
        else {
            brandsfilter = brandsfilter.filter((element) => element != e.target.value);
        }
        filter();
    }
    function filterCat(e) {
        if (e.target.checked) {
            catsfilter.push(e.target.value);
        }
        else {
            catsfilter = catsfilter.filter((element) => element != e.target.value);
        }
        filter();
    }
    function filter() {
        if (catsfilter.length === 0 && brandsfilter.length === 0) {
            setProductsDataFiltered({ ...productsDataFiltered, products: productsData.products.filter((product) => (product.name.includes(search))) });
        }
        else if (catsfilter.length === 0) {
            setProductsDataFiltered({ ...productsDataFiltered, products: (productsData.products.filter((product) => (brandsfilter.includes(product.brand._id) && product.name.includes(search)))) })
        }
        else if (brandsfilter.length === 0) {
            setProductsDataFiltered({ ...productsDataFiltered, products: (productsData.products.filter((product) => catsfilter.includes(product.category._id) && (product.name.includes(search)))) })
        } else {
            setProductsDataFiltered({ ...productsDataFiltered, products: (productsData.products.filter((product) => (catsfilter.includes(product.category._id) && brandsfilter.includes(product.brand._id) && (product.name.includes(search))))) })
        }
    }

    return (
        <div className="container flex m-0 col-12 p-0">
            <NavBarcomp />
            <div className="row col-12 m-0 p-0">
                <div className="card col-sm-7 col-xl-2 col-md-4 m-3 ">
                    <article className="card-group-item">
                        <header className="card-header">
                            <h6 className="title">Brands </h6>
                        </header>
                        <div className="filter-content">
                            <div className="card-body">
                                    {brands.map((brand) =>
                                        <label className="form-check" key={"b"+brand._id}>
                                            <input className="form-check-input" type="checkbox" value={brand._id} onClick={filterBrand} />
                                            <span className="form-check-label">
                                                {brand.name}
                                            </span>
                                        </label>
                                    )}
                            </div>
                        </div>
                    </article>
                    <article className="card-group-item">
                        <header className="card-header">
                            <h6 className="title">categories </h6>
                        </header>
                        <div className="filter-content">
                            <div className="card-body">
                                    {cats.map((cat) =>
                                        <label className="form-check" key={"c"+cat._id} >
                                            <input className="form-check-input" type="checkbox" value={cat._id} onClick={filterCat} />
                                            <span className="form-check-label">
                                                {cat.name}
                                            </span>
                                        </label>
                                    )}
                            </div>
                        </div>
                    </article>
                </div>
                <div className="main container col-sm-4 col-xl-9 col-md-7 justify-content-center">
                    <div className="container col-12 row justify-content-center">
                        {productsDataFiltered.products.map((product, index) => <ProductCardComp key={Math.ceil(Math.random() * 100000)} product={product} userid={user_id}  toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/>)}
                    </div>
                </div>
            </div>

            <Footercomp />
        </div>
    );
}

export default Products;