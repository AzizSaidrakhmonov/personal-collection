import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './allCollections.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { useTranslation } from 'react-i18next';

const AllCollections = () => {
    const [search, setSearch] = useState('');
    const { allCollections, getItems } = useContext(UserContext);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');

    const handleClickPost = async (e, id) => {
        e.preventDefault();

        const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/item/get_all/${id}`, {
            headers: {
                Authorization: accessToken,
            },
        });

        localStorage.setItem('id', id);
        getItems();
        // console.log(res.data)

        navigate('/allCollections/items');

        window.location.reload()
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
                        <Carousel className='slick'>
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
                                        <article className='card mt-3' key={id} onClick={(e) => handleClickPost(e, id)}>
                                            <h5 style={{ textDecoration: 'none' }}>
                                                {t('allCollections topic')}: {topic}
                                            </h5>
                                            <img
                                                src={imageUrl}
                                                alt={t('allCollections name')}
                                                style={{ cursor: 'pointer' }}
                                                className='allCollections-img'
                                            />
                                            <h4>
                                                {t('allCollections name')}: {name}
                                            </h4>
                                            <p>
                                                {t('allCollections description')}: {description}
                                            </p>
                                        </article>
                                    );
                                })}
                        </Carousel>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AllCollections;
