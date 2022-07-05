import { useNavigate } from 'react-router';
import React, { useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const Posts = ({ posts }) => {
    const navigate = useNavigate();

    const { topics } = useContext(UserContext);
    const accessToken = localStorage.getItem('accessToken');

    const handleClickPost = async (e, id) => {
        e.preventDefault();

        console.log('key index:', id);

        const res = await axios.get(
            `http://10.10.2.195:8080/api/item/get_all/${id}`,
            {
                headers: {
                    Authorization: accessToken,
                },
            },
        );

        console.log(res.data.data);
            
        navigate('/allCollections/items');
        
    };

    return (
        <>
            <div className='topics-container'>
                <label htmlFor='topics' className='topics-container__label'>
                    Choose a topic:
                </label>
                <select name='topics' id='topics' className='topics-container__select'>
                    {topics.map((topic) => {
                        const { name } = topic;
                        return (
                            <option value={name} style={{ overflow: 'hidden' }}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className='container'>
                {posts.map((post) => {
                    const { id, topic, name, description, imageUrl } = post;
                    return (
                            <article
                                className='card'
                                key={id}
                                style={{ cursor: 'pointer' }}
                                onClick={e => handleClickPost(e, id)}
                            >
                                <h5 style={{ textDecoration: 'none' }}>{topic}</h5>
                                <img src={imageUrl} alt={name} />
                                <h4>{name}</h4>
                                <p>{description}</p>
                            </article>
                    );
                })}
            </div>
        </>
    );
};

export default Posts;
