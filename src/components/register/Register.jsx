import React, { useRef, useState } from 'react';
import './RegisterStyle.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {

    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const statusText = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { name, email, password, role} = e.target.elements;

        const res = await axios.post('.../new-user', {
            name: name.value ? name.value : '',
            email: email.value,
            password: password.value,
            role: role.value
        });

        if(res.data.status === 200){
            alert('Successfully registered');
            
            setTimeout(() => {
                navigate(`/mainPage/${res.data.token}`);
            }, 1000)
        } else {
            alert('This username is taken, pls try again')
        }


    }

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

                <div className='register-page__input mt-3'>
                    <label htmlFor='role'>Role</label>

                    <select name='role' id='role' className='form-select'>
                        <option className='register-page__option' value='admin'>Admin</option>
                        <option className='register-page__option' value='user'>User</option>
                    </select>
                </div>
                <input 
                    type='submit'
                    value='Sign Up'
                    className='register-page__submit btn btn-primary mt-4'
                />
                <div className="register-page__link-wrapper mt-4">
                    <p className="register-page__link">Do you have an account?</p>
                    <Link to="/login">Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;