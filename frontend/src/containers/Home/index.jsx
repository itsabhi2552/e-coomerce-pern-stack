import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default ({ role }) => {
    const username = localStorage.getItem('username');
    const [products, setProducts] = useState([]);

    useEffect(() => getProduct(), []);

    const data = {
        no_of_products: 100,
        starting_from: 0,
        token: localStorage.getItem('token')
    }

    const getProduct = () => {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data.data)
                //change color of add btn
            });
    }

    function changeCart(flag, id) {
        data.productId = id;

        if (!flag) {
            fetch('http://localhost:3000/addToCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        } else {
            fetch('http://localhost:3000/removeFromCart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });

        }
    }

    return (
        <>
            <div className='row bg-dark text-light p-2'>
                <div className='col-2 d-flex justify-content-center align-items-center'>
                    <div>{username}</div>
                </div>
                <div className="col-5"></div>
                <div className='col d-flex justify-content-evenly'>
                    <Link to="/myCart" className='btn btn-primary text-decoration-none'>My Cart</Link>
                    <Link to="/myOrder" className='btn btn-warning text-decoration-none text-white'>My Order</Link>
                    <Link to="/resetPassword" className='btn btn-secondary text-decoration-none '>Reset Password</Link>
                    <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                </div>
            </div>

            <div className='container'>

                <div className="text-center mt-3"><h5>HOME</h5></div>
                <div className="row mx-3 mt-4 bg-dark text-center text-white">
                    <div className="col py-3 border"><h5>IMAGE</h5></div>
                    <div className="col py-3 border"><h5>NAME</h5></div>
                    <div className="col py-3 border"><h5>PRICE</h5></div>
                    <div className="col py-3 border"><h5>DESCRIPTION</h5></div>
                    <div className="col py-3 border"><h5>CART</h5></div>
                </div>
                {
                    products.map((item, index) => {
                        return (
                            <div className="row mx-3 bg-dark text-center text-white" key={index}>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">
                                    <img src={`http://localhost:3000/${item.image}`} width='100' alt="Not Found" />
                                </div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.name}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.price}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.description}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">
                                    <input
                                        type="button"
                                        onClick={() => {
                                            changeCart(item.myCart, item.id);
                                            getProduct();
                                        }}
                                        value={item.myCart ? 'Added To Cart' : 'Add To Cart'}
                                        className={item.myCart ? 'btn btn-warning text-white' : 'btn btn-success'}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </>
    );
};