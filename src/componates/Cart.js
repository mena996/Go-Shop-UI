import React from 'react';


const Cart = () => {

    return (
        <div className="col-12 justify-content-center">
            <div className="container col-10 row">
                <div className="container col-8">

                </div>
                <div className="container col-4 ">
                    <div class="tcard card bg-light mb-3 mt-5">
                        <div class="card-header">total amount</div>
                        <div class="card-body">
                            <h5 class="card-title">
                                5000000 LE 
                            <button className="btn btn-success ml-2">check out</button></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;