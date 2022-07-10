import React, { useContext, useEffect, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleItem = () => {
    const { singleItem, getSingleItem } = useContext(UserContext);
    console.log(singleItem);

    const uniqueItems = useMemo(() => {
        if (singleItem.fields) {
            return singleItem.fields.map((el, index) => {
                return Object.assign(el, singleItem.itemFields[index]);
            });
        }
    }, [singleItem]);
    console.log(uniqueItems);



    const ItemElement = useMemo(() => {
        if (singleItem.item) {
            return (
                <div className='single-item__main'>
                    <div className='single-item__main-name'>
                        <h4>Name:</h4>
                        <div>{singleItem.item.name}</div>
                    </div>
                    <div className='single-item__main-tags'>
                        <h5>Tags:</h5>
                        <div>
                            {singleItem.item.tagList.map((tag) => (
                                <span key={tag.id}> #{tag.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className='single-item__main-fields'>
                        <h5>Fields:</h5>
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
                            <FavoriteBorderIcon style={{ cursor: 'pointer' }} />
                            <div>{singleItem.item.likes} likes</div>
                        </div>
                        <form className='single-item__action-comment'>
                            <input type='text' name='text' placeholder='Add a comment ...' required />
                            <button type='submit'>Post</button>
                        </form>
                    </div>
                </div>
            );
        }
    }, [singleItem]);

    return (
        <>
            <Link to='/allCollections/items'>
                <button className='btn btn-primary mx-3'>
                    <ArrowBackIcon />
                    Back
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
