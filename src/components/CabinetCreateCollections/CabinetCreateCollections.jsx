import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import FormData from 'form-data';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './cabinetCreateCollections.scss';
import axios from 'axios';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { useTranslation } from 'react-i18next';

const CabinetCreateCollections = () => {
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [modal, setModal] = useState(false);

    const { t, i18n } = useTranslation();
    const { oneUser, topics, ownCollections, getAllCollections } = useContext(UserContext);
    const userId = oneUser.id;

    // console.log(ownCollections);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (topics.length > 0) {
            setTopic(topics[0].name);
        }
    }, [topics]);

    const sendCollection = async (e) => {
        e.preventDefault();

        const imageData = new FormData();
        imageData.append('file', file, file.name);

        try {
            const res1 = await axios.post(`http://192.168.43.127:8080/api/image/profile/pic`, imageData, {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const res2 = await axios.post(
                `http://192.168.43.127:8080/api/collection/add/${userId}`,
                {
                    topic: topic,
                    imageUrl: res1.data.data,
                    name: name,
                    description: description,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );
            console.log(res2.data.data);
        } catch (err) {
            console.log(err);
        }
        getAllCollections();
        window.location.reload();
    };

    const handleDelete = async (e, id) => {
        console.log(id);
        try {
            const res = await axios.delete(`http://192.168.43.127:8080/api/collection/delete/${userId}/${id}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getAllCollections();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    };

    return (
        <div className='cabinet2'>
            <div className='cabinet2-top'>
                <div className='cabinet2-top__btn'>
                    <Link to='/personalCabinet'>
                        <button className='btn btn-primary mx-3'>
                            <ArrowBackIcon />
                            {t('create collections back btn')}
                        </button>
                    </Link>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        {t('create collections create btn')}
                    </button>
                </div>
            </div>
            {modal && (
                <div className='cabinet2-main'>
                    <div className='cabinet2-main__form '>
                        <form onSubmit={sendCollection}>
                            <div className='wrapper wrapper-top'>
                                <select
                                    name='topics'
                                    id='topics'
                                    onChange={(e) => {
                                        setTopic(e.target.value);
                                    }}
                                    className='cabinet2-main__form-input'
                                    style={{ cursor: 'pointer' }}
                                >
                                    {topics.map((topic) => {
                                        const { id, name } = topic;
                                        return (
                                            <option
                                                key={id}
                                                value={name}
                                                className='cabinet2-main__form-input'
                                                style={{ overflow: 'hidden' }}
                                            >
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <CloseIcon
                                    onClick={() => {
                                        setModal(false);
                                        setFile('');
                                    }}
                                    className='close-modal__icon'
                                />
                            </div>
                            <div className='wrapper upload-photo'>
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : 'https://www.colliver.io/wp-content/themes/consultix/images/no-image-found-360x260.png'
                                    }
                                    alt='create-collection'
                                />

                                <label htmlFor='file'>
                                    {t('create collections choose img')}
                                    : <DriveFileMoveIcon className='label-icon' />
                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    type='file'
                                    name='file'
                                    id='file'
                                    className='cabinet2-main__form-input'
                                    accept='image/*'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder={t('create collections modal name')}
                                    required
                                    className='cabinet2-main__form-input'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='wrapper'>
                                <textarea
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder={t('create collections modal description')}
                                    required
                                    className='cabinet2-main__form-input'
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ height: '30px' }}
                                ></textarea>
                                <button
                                    type='submit'
                                    className='cabinet2-main__form-btn btn btn-primary'
                                    onClick={() =>
                                        setTimeout(() => {
                                            setModal(false);
                                        }, [500])
                                    }
                                >
                                    {t('create collections modal btn')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className='container'>
                <Carousel className='slick'>
                {ownCollections.map((ownCollection) => {
                    const { id, topic, name, description, imageUrl } = ownCollection;
                    return (
                            <article className='ownCollection-card mt-3' key={id}>
                                <h5>
                                    {t('create collections topic')}: {topic}
                                </h5>
                                <img src={imageUrl} alt={t('create collections name')} />
                                <h4>
                                    {t('create collections name')}: {name}
                                </h4>
                                <p>
                                    {t('create collections description')}: {description}
                                </p>
                                <div className='ownCollections__item-actions'>
                                    <EditIcon className='edit-tag' />
                                    <DeleteIcon className='delete-tag' onClick={(e) => handleDelete(e, id)} />
                                </div>
                            </article>
                    );
                })}
                </Carousel>
            </div>
        </div>
    );
};

export default CabinetCreateCollections;
