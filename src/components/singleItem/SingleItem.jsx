import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagIcon from '@mui/icons-material/Tag';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const SingleItem = () => {
    const { singleItem } = useContext(UserContext);
    console.log(singleItem);

    return (
        <div className='single-item'>
            <div className='single-item__main'>
                {Object.keys(singleItem).map((el) => {
                    const [fields, itemFields] = el
                    return (
                        <div>
                            <div className='single-item__name'>
                                <h4>Name:</h4>
                            </div>
                            <div className='single-item__likes'>
                                <FavoriteBorderIcon />
                                <p>Likes: </p>
                            </div>
                            <div className='single-item__tags'>
                                <div className='single-item__tag'>
                                    <TagIcon />
                                    <p>Tags:</p>
                                </div>
                            </div>
                            <div className='single-item__fields'>
                                <div className='single-item__field'>
                                    <FeaturedPlayListIcon />
                                    <p>Fields:</p>
                                </div>
                            </div>
                            <div className='single-item__actions'>
                                <div className='single-item__action-like'>
                                    <FavoriteBorderIcon />
                                </div>
                                <form className='single-item__action-comment'>
                                    <input type='text' name='text' placeholder='Add a comment ...' required />
                                    <input type='submit' value='Post' />
                                </form>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='single-item__comments'>kdjskjdksjdksj</div>
        </div>
    );
};

export default SingleItem;
