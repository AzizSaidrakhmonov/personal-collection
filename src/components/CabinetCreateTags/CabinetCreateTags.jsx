import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './cabinetCreateTags.scss';

const CabinetCreateTags = () => {
    const [modal, setModal] = useState(false);

    // const accessToken = localStorage.getItem('accessToken');

    const sendCreatedTag = async (e) => {
        e.preventDefault();

        try {
            const { name } = e.target.elements;

            const res = await axios.post('http://itransitionlasttask.herokuapp.com/api/tag/add', {
                name: name.value,
            });

            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        sendCreatedTag();
    }, []);

    return (
        <div className='create-tags'>
            <div className='create-tags__top'>
                <div className='create-tags__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Tag
                    </button>
                </div>
            </div>
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
                            <button type='submit' className='create-tags__form-btn btn btn-primary mt-3'>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CabinetCreateTags;
