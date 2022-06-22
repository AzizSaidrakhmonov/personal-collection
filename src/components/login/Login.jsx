import React, { useState, useRef, useEffect } from 'react';
import './LoginStyle.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {Istatus} from '../helpers/interfaces';
import { setStatusFunc } from '../helpers/setStatus';

const Login = () => {

    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const statusText = useRef(null);


    const handleSubmit = async(e) => {
        e.preventDefault();

        const {email, password} = e.target.elements;

        const res = await axios.post('.../login', {
            email: email.value,
            password: password.value
        });

        const statusValue: Istatus = setStatusFunc(res.data.status);

        setStatus(statusValue.massage);
        statusText.current?.classList.add(statusValue.massage);

        setTimeout(() => {
            statusText.current?.classList.remove(statusValue.massage);
        }, statusValue.time);

        if(res.data.status === 200) {
            setTimeout(() => {
                navigate(`/mainPage/${res.data.token}`);
            }, 1000)
        }

    }

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
               
                <p className="login-page__status" ref={statusText}>{status}</p>

                <input 
                    type='submit'
                    value='Log In'
                    className='login-page__submit btn btn-primary mt-4'
                />
                <div className="login-page__link-wrapper mt-4">
                    <p className="login-page__link">Don't you have an account?</p>
                    <Link to="/register">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;