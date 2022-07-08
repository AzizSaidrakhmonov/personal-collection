import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinetCreateTags.scss';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CabinetCreateTags = () => {
    const { tags } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const sendCreatedTag = async (e) => {
        e.preventDefault();

        try {
            const { name } = e.target.elements;

            const res = await axios.post(
                'http://10.10.2.168:8080/api/tag/add',
                {
                    name: name.value,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        sendCreatedTag();
    }, []);

    useEffect(() => {}, [tags]);

    return (
        <div className='create-tags'>
            <div className='create-tags__top'>
                <div className='create-tags__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Tag
                    </button>
                </div>
            </div>

            <div>
                {modal && (
                    <div className='create-tags__form'>
                        <form onSubmit={sendCreatedTag}>
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
                                    className='create-tags__form-input'
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='submit'
                                    value='Add'
                                    className='create-tags__form-btn btn btn-primary mt-3'
                                    onClick={() =>
                                        setTimeout(() => {
                                            setModal(false);
                                        }, 500)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className='create-tags__main'>
                {tags.map((tag) => {
                    const { id, name } = tag;
                    return (
                        <div className='create-tags__item'>
                            <div className='create-tags__item-id'>
                                <span>Id:</span>
                                <p>{id}</p>
                            </div>
                            <div className='create-tags__item-name'>
                                <span>Name:</span>
                                <p>{name}</p>
                            </div>
                            <div className='create-tags__item-actions'>
                                <EditIcon className='edit-tag' />
                                <DeleteIcon className='delete-tag' />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CabinetCreateTags;
