import React from 'react';
import ProductCardComp from './ProductCardComp';
import NavBarcomp from './NavBarcomp';
import Footercomp from './Footercomp';
import { UserContext } from '../App';
import { fetchData } from './adminPanel/helpers';


const Products = () => {
    const [productsData, setProductsData] = React.useState({ products: [], loading: false });
    const [ toggleUpdate, setToggleUpdate ] = React.useState(false);
    //user state
    const { user } = React.useContext(UserContext);
    const user_id = user ? user._id : null;


    React.useEffect(() => {
        //setting loading to true
        setProductsData({ ...productsData, loading: true })
        fetchData('products').then(res => setProductsData({ ...productsData, products: res }));
        //setting loading to false
        setProductsData({ ...productsData, loading: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsData.loading]);

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
                                <form>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Mersedes Benz
				                        </span>
                                    </label>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Nissan Altima
                                        </span>
                                    </label>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Another Brand
                                        </span>
                                    </label>
                                </form>

                            </div>
                        </div>
                    </article>
                    <article className="card-group-item">
                        <header className="card-header">
                            <h6 className="title">categories </h6>
                        </header>
                        <div className="filter-content">
                            <div className="card-body">
                                <form>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Mersedes Benz
				                        </span>
                                    </label>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Nissan Altima
                                        </span>
                                    </label>
                                    <label className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" />
                                        <span className="form-check-label">
                                            Another Brand
                                        </span>
                                    </label>
                                </form>

                            </div>
                        </div>
                    </article>
                </div>
                <div className="main container col-sm-4 col-xl-9 col-md-7 justify-content-center">
                    <div className="container col-12 row justify-content-center">
                        {productsData.products.map((product, index) => <ProductCardComp product={product} userid={user_id} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/>)}
                    </div>
                </div>
            </div>

            <Footercomp />
        </div>
    );
}

export default Products;