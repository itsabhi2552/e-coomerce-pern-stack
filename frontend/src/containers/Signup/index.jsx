import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
};

export default () => {
    const [error, setError] = useState('');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        onSubmit: (user) => {
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => setError(data.error));
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
                        <label htmlFor='username' className='mt-2'>Username</label>
                        <input
                            className='mt-2 px-2'
                            type="text"
                            name='username'
                            id='username'
                            placeholder='Username'
                            value={values.username}
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
                        <input type='submit' className='btn btn-success mt-4' value='Create Account' />
                        <div className='text-center mt-4'>
                            Already have a account?&nbsp;
                            <Link to="/" className='text-decoration-none'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};