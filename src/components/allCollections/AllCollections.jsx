import React, { useContext } from 'react';
import axios from 'axios';
import './allCollections.scss';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';

const AllCollections = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const { allCollections, topics } = useContext(UserContext);

    console.log(allCollections);

    const handleClickPost = async (e, id) => {
        e.preventDefault();
        
        console.log('key index:', id);
        
        const res = await axios.get(`http://itransitionlasttask.herokuapp.com/api/item/get_all/${id}`, {
            headers: {
                Authorization: accessToken,
            },
        });
        
        console.log(res.data.data);
        localStorage.setItem('id', id)

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
