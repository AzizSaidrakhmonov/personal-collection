import React, { useState, useEffect, useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinetCreateTopics.scss';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useTranslation } from 'react-i18next';


const CabinetCreateTopics = () => {
    const [modal, setModal] = useState(false);
    const accessToken = window.localStorage.getItem('accessToken');
    const { topics, getTopics } = useContext(UserContext);
    const { t, i18n } = useTranslation();


    const sendCreatedTopic = async (e) => {
        e.preventDefault();

        const { name } = e.target.elements;

        try {
            const res = await axios.post(
                'http://192.168.43.127:8080/api/topic/add',
                {
                    name: name.value,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
            getTopics();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (e, id) => {
        console.log(id);
        try {
            const res = await axios.delete(`http://192.168.43.127:8080/api/topic/delete/${id}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getTopics();
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
                    <Link to='/personalCabinet'>
                        <button className='btn btn-primary mx-3'>
                            <ArrowBackIcon />
                            
                            {t('create topics back')}
                        </button>
                    </Link>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                    {t('create topics create')}
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
                                placeholder={t('create topics name')}
                                required
                                className='create-topics__form-input'
                            />
                        </div>
                        <div className='wrapper'>
                            <input
                                type='submit'
                                value={t('create topics modal btn')}
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
            <div className='create-topics__main'>
                {topics.map((topic) => {
                    const { id, name } = topic;
                    return (
                        <div className='create-topics__item' key={id}>
                            <div className='create-topics__item-name'>
                                <span>{t('create topics name')}:</span>
                                <p>{name}</p>
                            </div>
                            <div className='create-topics__item-actions'>
                                <EditIcon className='edit-topic' />
                                <DeleteIcon className='delete-topic' onClick={(e) => handleDelete(e, id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CabinetCreateTopics;
