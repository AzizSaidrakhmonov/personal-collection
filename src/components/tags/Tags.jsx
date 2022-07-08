import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './tags.scss';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tags = () => {
    const { tags } = useContext(UserContext);

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

    return (
        <div className='create-tags'>
            <h2 className='tags-header'>All Tags</h2>
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

export default Tags;
