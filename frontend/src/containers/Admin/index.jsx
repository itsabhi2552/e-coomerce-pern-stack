import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const product = {
    name: '',
    price: '',
    description: '',
    quantity: '',
    image: ''
};

export default ({ role }) => {
    const ref = useRef();
    const [msg, setMsg] = useState('');
    const username = localStorage.getItem('username');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: product,

        onSubmit: (product) => {
            const formData = new FormData();

            // formData.append(name, price, description, quantity, image)
            formData.append('name', product.name)
            formData.append('price', product.price)
            formData.append('description', product.description)
            formData.append('quantity', product.quantity)
            formData.append('image', product.image)

            fetch('http://localhost:3000/addNewProduct', {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(product)
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    setMsg(data);
                    values.name = '';
                    values.price = '';
                    values.description = '';
                    values.quantity = '';
                    values.image = '';
                    ref.current.value = null;
                });
        }
    });

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark p-2">
                    <div className='col-2 d-flex justify-content-center align-items-center text-white'>
                        <div>{username}</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="col d-flex justify-content-evenly">
                        <Link
                            to="/showAllProduct"
                            className='btn btn-primary text-decoration-none'
                        >Show All
                        </Link>
                        <Link to="/orders" className='btn btn-warning text-decoration-none text-white'>Orders</Link>
                        <Link to="/resetPassword" className='btn btn-secondary text-decoration-none'>Reset Password</Link>
                        <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                    </div>
                </div>
                <div className="container mt-5 bg-dark rounded w-50 text-light">
                    <form onSubmit={handleSubmit} className='container d-flex flex-column w-75 p-3'>
                        <label className='text-danger'>{msg}</label>
                        <label htmlFor='name' className='mt-3'>Name</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Name'
                            value={values.name}
                            onChange={handleChange}
                        />
                        <label htmlFor='price' className='mt-2'>Price</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='price'
                            id='price'
                            placeholder='Price'
                            value={values.price}
                            onChange={handleChange}
                        />
                        <label htmlFor='description' className='mt-2'>Description</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='description'
                            id='description'
                            placeholder='Descripiton'
                            value={values.description}
                            onChange={handleChange}
                        />
                        <label htmlFor='quantity' className='mt-2'>Quantity</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='quantity'
                            id='quantity'
                            placeholder='Quantity'
                            value={values.quantity}
                            onChange={handleChange}
                        />
                        <label htmlFor='image' className='mt-2'>Image</label>
                        <input
                            className='mt-2'
                            type="file"
                            name='image'
                            id='image'
                            ref={ref}
                            onChange={(event) => {
                                values.image = event.target.files[0];
                            }}
                        />
                        <input type='submit' className='btn btn-success my-4' value='Add Product' />
                    </form>
                </div>
            </div>
        </>
    )
};