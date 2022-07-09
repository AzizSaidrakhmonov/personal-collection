import React, { useContext, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TagIcon from '@mui/icons-material/Tag';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const SingleItem = () => {
    const { singleItem } = useContext(UserContext);
    console.log(singleItem);

    const AzizAka = useMemo(() => {
        if (singleItem.fields) {
            return singleItem.fields.map((el, index) => {
                return Object.assign(el, singleItem.itemFields[index]);
            });
        }
    }, [singleItem]);
    console.log(AzizAka);

    const ItemElement = useMemo(() => {
        if (singleItem.item) {
            return (
                <div className='single-item__main'>
                    <div>
                        <div className='single-item__name'>
                            <h4>Name: {singleItem.item.name}</h4>
                        </div>
                        <div className='single-item__likes'>
                            <FavoriteBorderIcon />
                            <p>Likes: {singleItem.item.likes}</p>
                        </div>
                        <div className='single-item__tags'>
                            <div className='single-item__tag'>
                                <TagIcon />
                                <p>
                                    Tags:{' '}
                                    {singleItem.item.tagList.map((tag) => (
                                        <span key={tag.id}>{tag.name}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className='single-item__fields'>
                            <div className='single-item__field'>
                                <FeaturedPlayListIcon />
                                <p>Fields:</p>
                                {AzizAka &&
                                    AzizAka.map((Aziz) => (
                                        <div>
                                            <p>
                                                Name : {Aziz.name}, data: {Aziz.data}
                                            </p>
                                        </div>
                                    ))}
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
                </div>
            );
        }
    }, [singleItem]);

    return (
        <div className='single-item'>
            {ItemElement}
            <div className='single-item__comments'>kdjskjdksjdksj</div>
        </div>
    );
};

export default SingleItem;
