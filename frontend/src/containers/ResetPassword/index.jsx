import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
    password: '',
    confirmPassword: ''
};

export default ({userRole}) => {
    const [error, setError] = useState('');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        onSubmit: (user) => {
            fetch(`http://localhost:3000/resetPassword/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => setError(data));
        }
    });

    return (
        <>
            <div className='row bg-dark text-light p-2'>
                <div className="col-2 text-center">
                    <div>{username}</div>
                </div>
                <div className="col-7"></div>
                <div className='col d-flex justify-content-evenly'>
                    <Link to={role === 'admin' ? '/admin' : '/home'} className='btn btn-primary text-decoration-none mx-3'>Home</Link>
                    <Link to="/logout" className='btn btn-danger text-decoration-none'>Logout</Link>
                </div>
            </div>
            <div className='row'>
                <div className='col'></div>
                <div className='col d-flex justify-content-center align-content-center'>
                    <form onSubmit={handleSubmit} className='container d-flex flex-column w-50 p-3'>
                        <label className='text-danger'>{error}</label>
                        <label htmlFor='password' className='mt-2'>Password</label>
                        <input
                            className='mt-2 px-2'
                            type="Password"
                            name='password'
                            id='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={handleChange}
                        />
                        <label htmlFor='confirm-password' className='mt-2'>Confirm Password</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='confirmPassword'
                            id='confirm-password'
                            placeholder='Confirm Password'
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                        <input type='submit' className='btn btn-success mt-4' value='Reset' />
                    </form>
                </div>
            </div>
        </>
    );
};