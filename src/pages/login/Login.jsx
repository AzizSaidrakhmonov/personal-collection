import React from 'react';
import './login.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        const res = await axios.post('http://10.10.2.195:8080/api/auth/login', {
            email: email.value,
            password: password.value,
        });

        console.log(res.data);

        if (res.data.statusCode === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('email', email.value);

            console.log(email.value);

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className='login-page'>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <h1 className='login-page__title mt-5'>Log In</h1>
                <div className='mt-4'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        required
                        minLength={1}
                        className='login-page__input form-control'
                    />
                </div>

                <div className='mt-4'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                        minLength={1}
                        className='login-page__input form-control'
                    />
                </div>

                <input type='submit' value='Log In' className='login-page__submit btn btn-primary mt-4' />
                <div className='login-page__link-wrapper mt-4'>
                    <p className='login-page__link'>Don't you have an account?</p>
                    <Link to='/register'>Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
