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
        fetch('http://localhost:3000/showAllProducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }

    function updateProduct(item) {

        fetch('http://localhost:3000/updateProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
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

    function deleteProduct(id) {
        fetch('http://localhost:3000/deactivateProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                showAllProduct();
            });
    }

    function change(id, att, val) {

        let data = products.filter((item, index) => {
            return item.id !== id;
        });

        let changedData = products.filter((item, index) => {
            return item.id === id;
        })[0];

        changedData = { ...changedData, [att]: val };

        data.push(changedData);

        data.sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id);
        });

        setProducts(data);
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
                        <label className='text-danger'>{msg}</label>
                        <Link to="/admin" className='btn btn-primary text-decoration-none'>Home</Link>
                        <Link to="/orders" className='btn btn-warning text-decoration-none text-white'>Orders</Link>
                        <Link to="/resetPassword" className='btn btn-secondary text-decoration-none'>Reset Password</Link>
                        <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                    </div>
                </div>
                {
                    products.map((item, index) => {
                        return (
                            <div className="row bg-dark border-top border-bottom text-white py-3" key={index}>
                                <div className='col mt-4'>
                                    <img src={`http://localhost:3000/${item.image}`} width='125' alt="Not Found" />
                                </div>
                                <div className="col d-flex flex-column">
                                    <label htmlFor='name' className='mt-3'>Name</label>
                                    <label htmlFor='price' className='mt-2'>Price</label>
                                    <label htmlFor='description' className='mt-2'>Description</label>
                                    <label htmlFor='quantity' className='mt-2'>Quantity</label>
                                </div>
                                <div className="col d-flex flex-column">
                                    <input
                                        className='mt-2 px-2'
                                        type="text"
                                        name='name'
                                        id='name'
                                        placeholder='Name'
                                        value={item.name}
                                        onChange={(event) => change(item.id, 'name', event.target.value)}
                                    />
                                    <input
                                        className='mt-2 px-2'
                                        type="text"
                                        name='price'
                                        id='price'
                                        placeholder='Price'
                                        value={item.price}
                                        onChange={(event) => change(item.id, 'price', event.target.value)}
                                    />
                                    <input
                                        className='mt-2 px-2'
                                        type="text"
                                        name='description'
                                        id='description'
                                        placeholder='Descripiton'
                                        value={item.description}
                                        onChange={(event) => change(item.id, 'description', event.target.value)}
                                    />
                                    <input
                                        className='mt-2 px-2'
                                        type="text"
                                        name='quantity'
                                        id='quantity'
                                        placeholder='Quantity'
                                        value={item.quantity}
                                        onChange={(event) => change(item.id, 'quantity', event.target.value)}
                                    />
                                    <div className='text-end'>
                                        <input
                                            onClick={() => updateProduct(item)}
                                            type="button" value="Update" className='btn btn-success m-3' />
                                        <input
                                            onClick={() => deleteProduct(item.id)}
                                            type="button" value="Delete" className='btn btn-danger' />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
};