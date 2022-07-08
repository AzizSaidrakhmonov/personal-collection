import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinetCreateTopics.scss';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const CabinetCreateTopics = () => {
    const [modal, setModal] = useState(false);
    const accessToken = window.localStorage.getItem('accessToken');

    const sendCreatedTopic = async (e) => {
        e.preventDefault();

        const { name } = e.target.elements;

        try {
            const res = await axios.post(
                'http://10.10.2.168:8080/api/topic/add',
                {
                    name: name.value,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        sendCreatedTopic();
    }, []);

    return (
        <div className='create-topics'>
            <div className='create-topics__top'>
                <div className='create-topics__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Topic
                    </button>
                </div>
            </div>
            {modal && (
                <div className='create-topics__form'>
                    <form onSubmit={sendCreatedTopic}>
                        <CloseIcon
                            onClick={() => {
                                setModal(false);
                            }}
                            className='close-modal__icon'
                        />
                        <div className='wrapper'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Name'
                                required
                                className='create-topics__form-input'
                            />
                        </div>
                        <div className='wrapper'>
                            <input
                                type='submit'
                                value='Add'
                                onClick={() =>
                                    setTimeout(() => {
                                        setModal(false);
                                    }, 500)
                                }
                                className='create-topics__form-btn btn btn-primary mt-3'
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CabinetCreateTopics;
