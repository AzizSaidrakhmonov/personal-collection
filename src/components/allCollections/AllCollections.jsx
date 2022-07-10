import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './allCollections.scss';

import { useTranslation } from 'react-i18next';

const AllCollections = () => {
    const [search, setSearch] = useState('');
    const { allCollections, getItems } = useContext(UserContext);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');

    const handleClickPost = async (e, id) => {
        e.preventDefault();

        const res = await axios.get(`http://192.168.43.127:8080/api/item/get_all/${id}`, {
            headers: {
                Authorization: accessToken,
            },
        });

        localStorage.setItem('id', id);
        getItems();
        // console.log(res.data)

        navigate('/allCollections/items');
    };

    return (
        <main>
            <section className='followers'>
                <div>
                    <div className='followers-container'>
                        <input
                            name='topics'
                            placeholder={t('allCollections search')}
                            className='followers-container__select'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='container'>
                        {allCollections
                            .filter((collection) => {
                                if (search === '') {
                                    return collection;
                                } else if (collection.topic.toLowerCase().includes(search.toLowerCase())) {
                                    return collection;
                                }
                            })
                            .map((collection) => {
                                const { id, topic, name, description, imageUrl } = collection;
                                return (
                                    <article
                                        className='card mt-3'
                                        key={id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => handleClickPost(e, id)}
                                    >
                                        <h5 style={{ textDecoration: 'none' }}>{t('allCollections topic')}: {topic}</h5>
                                        <img src={imageUrl} alt={t('allCollections name')} />
                                        <h4>{t('allCollections name')}: {name}</h4>
                                        <p>{t('allCollections description')}: {description}</p>
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
