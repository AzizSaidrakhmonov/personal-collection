import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import './singleItem.scss';

const SingleItem = () => {
    const { singleItem } = useContext(UserContext);
    console.log(singleItem);
    
    return (
        <div className='single-item'>
            <div className="single-item__main">
                <div className="single-item__name">
                    <h4>Name:</h4>
                </div>
                <div className="single-item__likes">
                    <p>Likes:</p>
                </div>
                <div className="single-item__tags">
                    <div className="single-item__tag">
                        Tag:
                    </div>
                </div>
                <div className="single-item__fields">
                    <div className="single-item__field">
                        Field:
                    </div>
                </div>
                <div className="single-item__actions">
                    <div className="single-item__action-like">

                    </div>
                    <form className='single-item__action-comment'>
                        <input type="text" name='text' placeholder='Add a comment ...' required />
                        <input type="submit" value='Post' />
                    </form>
                </div>
            </div>
            <div className="single-item__comments">
                kdjskjdksjdksj
            </div>
        </div>
    );
};

export default SingleItem;