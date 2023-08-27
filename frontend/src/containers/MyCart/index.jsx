import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
        script.onload = () => { resolve(true) }
        script.onerror = () => { resolve(false) }
    });
}

export default ({ role }) => {
    const [item, setItem] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    useEffect(() => getProduct(), [item]);


    const username = localStorage.getItem('username');
    const [products, setProducts] = useState([]);

    const data = {
        token: localStorage.getItem('token')
    }


    const getProduct = () => {
        fetch('http://localhost:3000/getCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            });
    }

    function changeQuantity(id, change) {
        data.productId = id;
        data.change = change;

        fetch('http://localhost:3000/changeQuantity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    function removeCart(id) {
        data.productId = id;

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

    async function order() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('failed to reload');
        } else {

            //check quantity


            const user = await fetch('http://localhost:3000/getUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json());

            const reqData = await fetch('http://localhost:3000/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products })
            }).then(res => res.json());

            const options = {
                key: "rzp_test_7W7EkLGJyTeS7c",
                name: "E-Commerce",
                description: "Test Transaction",
                amount: reqData.amount.toString(),
                currency: reqData.currency,
                order_id: reqData.id,
                handler: (response) => {
                    data.products = products;
                    data.transactionid = response.razorpay_payment_id;
                    data.orderid = response.razorpay_order_id;

                    fetch('http://localhost:3000/addOrder', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data === 'success') {
                                navigate('/myOrder');
                            } else {
                                setMsg('Out of stock');
                                setTimeout(() => setMsg(''), 3000);
                            }
                        });
                },
                prefill: user
            };
            const paymentObject = new Razorpay(options);
            paymentObject.open();
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
                    <Link to="/home" className='btn btn-primary text-decoration-none'>Home</Link>
                    <Link to="/myOrder" className='btn btn-warning text-decoration-none text-white'>My Order</Link>
                    <Link to="/resetPassword" className='btn btn-secondary text-decoration-none'>Reset Password</Link>
                    <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                </div>
            </div>

            <div className='container'>

                <div className="d-flex justify-content-center text-center mt-3">
                    <div className="row w-100">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h5>MY CART DETAILS</h5>
                        </div>
                        <div className="col-2 text-danger text-end">{msg}</div>
                        <div className="col-2 text-end">
                            <input
                                type="button"
                                value="CheckOut"
                                onClick={order}
                                className='btn btn-danger mx-1'
                            />
                        </div>
                    </div>
                </div>
                <div className="row mx-3 mt-4 bg-dark text-center text-white">
                    <div className="col py-3 border"><h5>IMAGE</h5></div>
                    <div className="col py-3 border"><h5>NAME</h5></div>
                    <div className="col py-3 border"><h5>PRICE</h5></div>
                    <div className="col py-3 border"><h5>DESCRIPTION</h5></div>
                    <div className="col py-3 border"><h5>QUANTITY</h5></div>
                    <div className="col py-3 border"><h5>REMOVE</h5></div>
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
                                    <div className="row">
                                        <div className="col">
                                            <input onClick={() => {
                                                changeQuantity(item.id, 'decrease');
                                                setItem(item.id + item.cartquantity);
                                            }} type="button" value="-" className='btn btn-warning'
                                            />
                                        </div>
                                        <div className="col"><input type="button" value={item.cartquantity} className='btn text-white mx-0 px-0' /></div>
                                        <div className="col">
                                            <input onClick={() => {
                                                changeQuantity(item.id, 'increase');
                                                setItem(item.id + item.cartquantity);
                                            }} type="button" value="+" className='btn btn-warning' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center py-4 border">
                                    <input
                                        onClick={() => {
                                            removeCart(item.id);
                                            getProduct();
                                        }}
                                        type="button" value="Remove" className='btn btn-danger'
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