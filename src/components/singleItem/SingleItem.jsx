import React, { useState, useEffect, useContext, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext';

const SingleItem = () => {
    const [item, setItem] = useState({});
    const { t, i18n } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const itemId = localStorage.getItem('itemId');

    const { singleItem, oneUser, getSingleItem, comments, getComments } = useContext(UserContext);

    console.log(comments);

    const uniqueItems = useMemo(() => {
        if (singleItem.fields) {
            return singleItem.fields.map((el, index) => {
                return Object.assign(el, singleItem.itemFields[index]);
            });
        }
    }, [singleItem]);

    console.log(uniqueItems);

    const handleLike = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/item/like/${oneUser.id}/${itemId}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            console.log(res.data);
            getSingleItem();
        } catch (err) {
            console.log(err);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();

        try {
            const { name } = e.target.elements;

            const res = await axios.post(
                `http://ec2-54-167-37-126.compute-1.amazonaws.com:8081/api/comment/add`,
                {
                    userId: oneUser.id,
                    itemId: itemId,
                    name: name.value,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );

            getComments();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleLike();
    }, []);

    const ItemElement = useMemo(() => {
        if (singleItem.item) {
            return (
                <div className='single-item__main'>
                    <div className='single-item__main-name'>
                        <h4>{t('single item name')}:</h4>
                        <div>{singleItem.item.name}</div>
                    </div>
                    <div className='single-item__main-tags'>
                        <h5>{t('single item tags')}:</h5>
                        <div>
                            {singleItem.item.tagList.map((tag) => (
                                <span key={tag.id}> #{tag.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className='single-item__main-fields'>
                        <h5>{t('single item fields')}:</h5>
                        <div>
                            {uniqueItems &&
                                uniqueItems.map((uniqueItem) => (
                                    <span>
                                        <h6>{uniqueItem.name}:</h6>
                                        <div>{uniqueItem.data}</div>
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className='single-item__main-actions'>
                        <div className='single-item__action-like'>
                            <FavoriteIcon
                                style={{ cursor: 'pointer' }}
                                onClick={handleLike}
                                className={`${singleItem.isLike ? `liked` : `disliked`}`}
                            />
                            <div>
                                {singleItem.item.likes} {t('single item likes')}
                            </div>
                        </div>
                        <form className='single-item__action-comment' onSubmit={addComment}>
                            <input type='text' name='name' placeholder={t('single item comments')} required />
                            <button type='submit'>{t('single item comments post')}</button>
                        </form>
                    </div>
                </div>
            );
        }
    }, [singleItem]);

    // const handleLike = () => {

    // }

    return (
        <>
            <Link to='/allCollections/items'>
                <button className='btn btn-primary mx-3'>
                    <ArrowBackIcon />
                    {t('single item back btn')}
                </button>
            </Link>
            <div className='single-item'>
                {ItemElement}
                <div className='single-item__comments'>
                    {comments.map((comment) => {
                        const { username, text } = comment;
                        return (
                            <div className='single-item__comments-items'>
                                <div className='single-item__comments-item'>
                                    <div className='comment-name'>{username}</div>
                                    <div className='comment-text'>{text}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SingleItem;
