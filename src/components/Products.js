import React from 'react';
import ProductCardComp from './ProductCardComp';
import NavBarcomp from './NavBarcomp';
import Footercomp from './Footercomp';
import { UserContext } from '../App';
import { fetchData } from './adminPanel/helpers';


const Products = () => {
    const [productsData, setProductsData] = React.useState({ products: [], loading: false });
    //user state
    const { user, setUser } = React.useContext(UserContext);
    const user_id = user ? user.user._id : null;


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
            <div className="main">
                <div className="container col-12 row justify-content-center">
                    {productsData.products.map((product, index) => <ProductCardComp product={product} userid={user_id} />)}
                </div>
            </div>
            <Footercomp />
        </div>
    );
}

export default Products;