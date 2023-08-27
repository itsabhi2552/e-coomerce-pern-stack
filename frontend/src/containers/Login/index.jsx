import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
    email: '',
    password: ''
};

export default ({role}) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        onSubmit: (user) => {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {

                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('role', data.role);
                        role(data.role);
                        if (data.role === 'user') {
                            navigate('/home');
                        } else {
                            navigate('/admin');
                        }
                    } else {
                        setError(data.error);
                    }
                });
        }
    });

    return (
        <>
            <div className='row'>
                <div className='col'></div>
                <div className='col d-flex justify-content-center align-content-center'>
                    <form onSubmit={handleSubmit} className='container d-flex flex-column w-50 p-3'>
                        <label className='text-danger'>{error}</label>
                        <label htmlFor='email' className='mt-3'>Email</label>
                        <input
                            className='mt-2 px-2'
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                        />
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
                        <input type='submit' className='btn btn-success mt-4' value='Login' />
                        <div className='text-center mt-4'>
                            <Link to="/forgotPassword" className='text-decoration-none'>forgot password</Link>
                        </div>
                        <div className='text-center mt-2'>
                            Don't have a account?&nbsp;
                            <Link to="/signup" className='text-decoration-none'>SignUp</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};