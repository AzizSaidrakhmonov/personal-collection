import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './allCollections.scss';

const AllCollections = () => {
    const { allCollections, topics } = useContext(UserContext);
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const handleClickPost = async (e, id) => {
        e.preventDefault();

        const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8080/api/item/get_all/${id}`, {
            headers: {
                Authorization: accessToken,
            },
        });

        localStorage.setItem('id', id);

        // console.log(res.data)

        navigate('/allCollections/items');
    };

    return (
        <main>
            <section className='followers'>
                <div>
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
                        {allCollections.map((collection) => {
                            const { id, topic, name, description, imageUrl } = collection;
                            return (
                                <article
                                    className='card mt-3'
                                    key={id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => handleClickPost(e, id)}
                                >
                                    <h5 style={{ textDecoration: 'none' }}>{topic}</h5>
                                    <img src={imageUrl} alt={name} />
                                    <h4>{name}</h4>
                                    <p>{description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AllCollections;
