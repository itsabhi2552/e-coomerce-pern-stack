import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
    email: ''
};

export default () => {
    const [error, setError] = useState('');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        onSubmit: (user) => {
            fetch(`http://localhost:3000/forgotPassword/`, {
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
            <div className='row'>
                <div className='col'></div>
                <div className='col d-flex justify-content-center align-content-center'>
                    <form onSubmit={handleSubmit} className='container d-flex flex-column w-50 p-3'>
                        <label className='text-danger'>{error}</label>
                        <label htmlFor='password' className='mt-2'>Email</label>
                        <input
                            className='mt-2 px-2'
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                        />
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to="/" className='btn btn-primary mt-4 text-decoration-none'>Back to Login</Link>
                            <input type='submit' className='btn btn-success mt-4' value='Verify' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};