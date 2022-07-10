import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './tags.scss';
import axios from 'axios';

const Tags = () => {
    const { tags } = useContext(UserContext);

    return (
        <div className='create-tags'>
            <h2 className='tags-header'>All Tags</h2>
            <div className='create-tags__main'>
                {tags.map((tag) => {
                    const { id, name } = tag;
                    return (
                        <div className='create-tags__item' key={id}>
                            <div className='create-tags__item-name'>
                                <span>Name:</span>
                                <p>{name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tags;
