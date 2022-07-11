import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './fields.scss';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const Fields = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('STRING');
    const [modal, setModal] = useState(false);
    const { oneUser, fields, getFields } = useContext(UserContext);

    const { t, i18n } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');
    const collectionId = localStorage.getItem('id');

    const handleField = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/field/add/${oneUser.id}/${collectionId}`,
                {
                    name: name,
                    type: type,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
            getFields();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (e, id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                `http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/field/delete/${oneUser.id}/${collectionId}/${id}`,
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
            getFields();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='create-fields'>
            <div className='create-fields__top'>
                <div className='create-fields__top-btn'>
                    <Link to='/allCollections/items'>
                        <button className='btn btn-primary mx-3'>
                            <ArrowBackIcon />
                            {t('fields back btn')}
                        </button>
                    </Link>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        {t('fields create btn')}
                    </button>
                </div>
            </div>
            {modal && (
                <div className='create-fields__form'>
                    <form onSubmit={handleField}>
                        <div className='create-fields__header'>
                            <h4>{t('fields modal title')}</h4>
                            <CloseIcon
                                onClick={() => {
                                    setModal(false);
                                }}
                                className='close-modal__icon'
                            />
                        </div>
                        <div className='form-inline mt-3'>
                            <div className='form-inline__items'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder={t('fields modal name')}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-inline__items'>
                                <select name='type' onChange={(e) => setType(e.target.value)}>
                                    <option className='option' value='STRING'>
                                        STRING
                                    </option>
                                    <option className='option' value='INTEGER'>
                                        INTEGER
                                    </option>
                                    <option className='option' value='TEXT'>
                                        TEXT
                                    </option>
                                    <option className='option' value='DATE'>
                                        DATE
                                    </option>
                                    <option className='option' value='BOOLEAN'>
                                        BOOLEAN
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className='button-section mt-5'>
                            <button
                                className='btn btn-primary'
                                type='submit'
                                onClick={() => {
                                    setTimeout(() => {
                                        setModal(false);
                                    }, 500);
                                }}
                            >
                                {t('fields modal add')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className='all-fields'>
                {fields.map((field) => {
                    const { id, name, type } = field;

                    return (
                        <div className='single-field' key={id}>
                            <div className='single-field__name'>
                                <span>{t('fields name')}:</span>
                                <p>{name}</p>
                            </div>
                            <div className='single-field__type'>
                                <span>{t('fields type')}:</span>
                                <p>{type}</p>
                            </div>
                            <div className='single-field__item-actions'>
                                <EditIcon className='edit-tag' />
                                <DeleteIcon className='delete-tag' onClick={(e) => handleDelete(e, id)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Fields;
