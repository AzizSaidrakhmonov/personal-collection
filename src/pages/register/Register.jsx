import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './register.scss';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = e.target.elements;

        const res = await axios.post('http://ec2-54-167-37-126.compute-1.amazonaws.com:8080/api/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });

        if (res.data.statusCode === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('email', email.value);

            setTimeout(() => {
                navigate(`/`);
            }, 1000);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div className='register-page'>
            <form className='register-page__form' onSubmit={handleSubmit}>
                <h1 className='register-page__title mt-5'>Sign Up</h1>
                <div className='mt-4'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        required
                        minLength={1}
                        className='register-page__input form-control'
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        required
                        minLength={1}
                        className='register-page__input form-control'
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
                        className='register-page__input form-control'
                    />
                </div>
                <input type='submit' value='Sign Up' className='register-page__submit btn btn-primary mt-4' />
                <div className='register-page__link-wrapper mt-4'>
                    <p className='register-page__link'>Do you have an account?</p>
                    <Link to='/login'>Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
