import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const user = {
    password: '',
    confirmPassword: ''
};

function send({role}) {
    const { token } = useParams();

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        onSubmit: (user) => {
            fetch(`http://localhost:3000/resetPassword/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    setError(data);
                    if (data === 'Success') {
                        setTimeout(() => {
                            role('');
                            navigate('/');
                        }, 1000);
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
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to="/" className='btn btn-primary mt-4 text-decoration-none'>Back to Login</Link>
                            <input type='submit' className='btn btn-success mt-4' value='Reset' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default send;