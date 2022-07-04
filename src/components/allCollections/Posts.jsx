import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../context/UserContext';

const Posts = ({ posts }) => {
    const { topics } = useContext(UserContext);

    return (
        <>
            <div className='topics-container'>
                <label htmlFor='topics' className='topics-container__label'>Choose a topic:</label>
                <select name='topics' id='topics' className='topics-container__select'>
                    {topics.map((topic) => {
                        const { name } = topic;
                        return <option 
                                    value={name} 
                                    style={{overflow: 'hidden'}}
                                >
                                    {name}
                                </option>;
                    })}
                </select>
            </div>

            <div className='container'>
                {posts.map((post) => {
                    const { avatar_url, id, login } = post;
                    return (
                        <Link to='/allCollections/collections'>
                            <article className='card' key={id} style={{cursor: 'pointer'}}>
                                <h5 style={{textDecoration: 'none'}}>Topic</h5>
                                <img src={avatar_url} alt={login} />
                                <h4>Name</h4>
                                <p>Description</p>
                            </article>
                        </Link>
                    ); 
                })}
            </div>
        </>
    );
};

export default Posts;
