import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.scss';
import axios from 'axios';

import { useTranslation } from 'react-i18next';


const Login = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        const res = await axios.post('http://192.168.43.127:8080/api/auth/login', {
            email: email.value,
            password: password.value,
        });

        if (res.data.statusCode === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('email', email.value);

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className='login-page'>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <h1 className='login-page__title mt-5'>{t('login page login')}</h1>
                <div className='mt-4'>
                    <label htmlFor='email'>{t('login page email')}</label>
                    <input
                        type='email'
                        name='email'
                        placeholder={t('login page email')}
                        required
                        minLength={1}
                        className='login-page__input form-control'
                    />
                </div>

                <div className='mt-4'>
                    <label htmlFor='password'>{t('login page password')}</label>
                    <input
                        type='password'
                        name='password'
                        placeholder={t('login page password')}
                        required
                        minLength={1}
                        className='login-page__input form-control'
                    />
                </div>

                <input type='submit' value={t('login page login')} className='login-page__submit btn btn-primary mt-4' />
                <div className='login-page__link-wrapper mt-4'>
                    <p className='login-page__link'>{t('login page question')}</p>
                    <Link to='/register'>{t('login page singup')}</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
