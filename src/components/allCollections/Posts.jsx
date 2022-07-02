import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ posts, loading }) => {
    return (
        <div className='container'>
            {posts.map((post) => {
                const { avatar_url, id, login } = post;
                return (
                    <article className='card' key={id}>
                        <h5>Topic</h5>
                        <img src={avatar_url} alt={login} />
                        <h4>Name</h4>
                        <p>Description</p>
                    </article>
                );
            })}
        </div>
    );
};

export default Posts;
