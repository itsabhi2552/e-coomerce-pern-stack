import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default ({ role }) => {
    useEffect(() => getProduct(), []);

    const username = localStorage.getItem('username');
    const [products, setProducts] = useState([]);

    const data = {
        token: localStorage.getItem('token')
    }


    const getProduct = () => {
        fetch('http://localhost:3000/myOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            });
    }

    return (
        <>
            <div className='row bg-dark text-light p-2'>
                <div className='col-2 d-flex justify-content-center align-items-center'>
                    <div>{username}</div>
                </div>
                <div className="col-5"></div>
                <div className='col d-flex justify-content-evenly'>
                    <Link to="/home" className='btn btn-primary text-decoration-none'>Home</Link>
                    <Link to="/myCart" className='btn btn-primary text-decoration-none'>My Cart</Link>
                    <Link to="/resetPassword" className='btn btn-secondary text-decoration-none'>Reset Password</Link>
                    <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                </div>
            </div>

            <div className='container'>

                <div className="text-center mt-3"><h5>MY ORDER DETAILS</h5></div>
                <div className="row mx-3 mt-4 bg-dark text-center text-white">
                    <div className="col-2 py-3 border"><h5>PAYMENT ID</h5></div>
                    <div className="col py-3 border"><h5>IMAGE</h5></div>
                    <div className="col py-3 border"><h5>NAME</h5></div>
                    <div className="col py-3 border"><h5>PRICE</h5></div>
                    <div className="col py-3 border"><h5>DESCRIPTION</h5></div>
                    <div className="col py-3 border"><h5>QUANTITY</h5></div>
                    <div className="col py-3 border"><h5>STATUS</h5></div>
                </div>
                {
                    products.map((item, index) => {
                        return (
                            <div className="row mx-3 bg-dark text-center text-white" key={index}>
                                <div className="col-2 d-flex justify-content-center align-items-center py-4 border">{item.tarnsactionid}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">
                                    <img src={`http://localhost:3000/${item.image}`} width='100' alt="Not Found" />
                                </div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.name}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.price}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.description}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">{item.quantity}</div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">
                                    {item.status === 'pending'
                                        ?
                                        <div className='text-danger'>Pending</div>
                                        :
                                        <div className='text-success'>Delivered</div>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};