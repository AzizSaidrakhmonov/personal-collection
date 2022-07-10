import React, { useState, useEffect, useContext, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const SingleItem = () => {
    const [isLike, setIsLike] = useState(false);
    const { t, i18n } = useTranslation();

    const { singleItem, oneUser } = useContext(UserContext);
    console.log(singleItem);

    // console.log(accessToken)/
    
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
        const accessToken = localStorage.getItem('accessToken');
        const itemId = localStorage.getItem('itemId');
        console.log(oneUser.id)
        console.log(itemId)
        try {
            const res = await axios.post(`http://192.168.43.127:8080/api/item/like/${oneUser.id}/${itemId}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleLike()
    }, [])

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
                            <FavoriteBorderIcon style={{ cursor: 'pointer' }} onClick={handleLike} />
                            <div>
                                {singleItem.item.likes} {t('single item likes')}
                            </div>
                        </div>
                        <form className='single-item__action-comment'>
                            <input type='text' name='text' placeholder={t('single item comments')} required />
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
                <div className='single-item__comments'>kdjskjdksjdksj</div>
            </div>
        </>
    );
};

export default SingleItem;
