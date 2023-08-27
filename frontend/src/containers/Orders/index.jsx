import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default ({ role }) => {
    const username = localStorage.getItem('username');
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        showAllProduct();
    }, []);

    function showAllProduct() {
        fetch('http://localhost:3000/allOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }

    function updateProduct(id, p_id) {

        fetch('http://localhost:3000/updateOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, p_id })
        })
            .then(res => res.json())
            .then(data => {
                setMsg(data);
                setTimeout(() => {
                    setMsg('');
                }, 1000);
                showAllProduct();
            });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark p-2">
                    <div className='col-2 d-flex justify-content-center align-items-center text-white'>
                        <div>{username}</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="col d-flex justify-content-evenly text-light">
                        <Link to="/admin" className='btn btn-primary text-decoration-none'>Home</Link>
                        <Link
                            to="/showAllProduct"
                            className='btn btn-primary text-decoration-none'
                        >Show All
                        </Link>
                        <Link to="/resetPassword" className='btn btn-secondary text-decoration-none'>Reset Password</Link>
                        <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                    </div>
                </div>
                <div className='container-fluid'>

                    <div className="text-center mt-3">
                        <div className="row w-100">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <h5>ORDER DETAILS</h5>
                            </div>
                            <div className="col-4 text-end">
                                <label className='text-success'>{msg}</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-3 mt-4 bg-dark text-center text-white">
                        <div className="col-2 py-3 border"><h5>PAYMENTID</h5></div>
                        <div className="col-2 py-3 border"><h5>ORDERID</h5></div>
                        <div className="col-1 py-3 border"><h5>USERID</h5></div>
                        <div className="col-1 py-3 border"><h5>P_ID</h5></div>
                        <div className="col-2 py-3 border"><h5>EMAIL</h5></div>
                        <div className="col-1 py-3 border"><h5>PRICE</h5></div>
                        <div className="col-1 py-3 border"><h5>QNT</h5></div>
                        <div className="col py-3 border"><h5>STATUS</h5></div>
                    </div>
                    {
                        products.map((item, index) => {
                            return (
                                <div className="row mx-3 bg-dark text-center text-white" key={index}>
                                    <div className="col-2 d-flex justify-content-center align-items-center py-4 border">{item.tarnsactionid}</div>
                                    <div className="col-2 d-flex justify-content-center align-items-center py-4 border">{item.orderid}</div>
                                    <div className="col-1 d-flex justify-content-center align-items-center py-4 border">{item.userid}</div>
                                    <div className="col-1 d-flex justify-content-center align-items-center py-4 border">{item.productid}</div>
                                    <div className="col-2 d-flex justify-content-center align-items-center py-4 border">{item.email}</div>
                                    <div className="col-1 d-flex justify-content-center align-items-center py-4 border">{item.price}</div>
                                    <div className="col-1 d-flex justify-content-center align-items-center py-4 border">{item.quantity}</div>
                                    <div className="col d-flex justify-content-center align-items-center py-4 border">
                                        {item.status === 'pending'
                                            ?
                                            <div 
                                            className='btn btn-danger'
                                            onClick={() => updateProduct(item.orderid, item.productid)}
                                            >Deliver</div>
                                            :
                                            <div className='text-success'>Delivered</div>
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
};