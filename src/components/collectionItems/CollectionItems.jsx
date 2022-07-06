import React, { useState, useEffect, useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './collectionItems.scss';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const CollectionItems = () => {
    const { oneUser } = useContext(UserContext);
    const collectionId = localStorage.getItem('id');

    const [modal, setModal] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const sendCreatedCollectionItem = async (e) => {
        e.preventDefault();

        try {
            const { name } = e.target.elements;

            const res = await axios.post(
                `http://10.10.1.67:8080/api/item/add/${oneUser.id}/${collectionId}`,
                {
                    name: name.value,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );

            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        sendCreatedCollectionItem();
    }, []);

    return (
        <div className='create-topics'>
            <div className='create-topics__top'>
                <div className='create-topics__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Item
                    </button>
                    <Link to='/fields'>
                        <button className='btn btn-success mx-3'>Fields</button>
                    </Link>
                </div>
            </div>
            {modal && (
                <div className='create-topics__form'>
                    <form onSubmit={sendCreatedCollectionItem}>
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

export default CollectionItems;
