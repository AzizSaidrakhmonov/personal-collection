import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import './allCollections.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AllCollections = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const fetchPost = async () => {
        const res = await axios.get('https://api.github.com/users/john-smilga/followers?per_page=100');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        setCurrentPage((oldPage) => {
            let nextPage = oldPage + 1;
            if (nextPage > postsPerPage) {
                nextPage = 1;
            }
            return nextPage;
        });
    };

    const prevPage = () => {
        setCurrentPage((oldPage) => {
            let prevPage = oldPage - 1;
            if (prevPage < 1) {
                prevPage = postsPerPage;
            }
            return prevPage;
        });
    };

    return (
        <main>
            <section className='followers'>
                <div>
                    <Posts posts={currentPost} />
                    <div className='btn-container'>
                        <button onClick={prevPage} className='prev-btn'>
                            <ArrowBackIcon />
                        </button>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={posts.length}
                            paginate={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <button onClick={nextPage} className='next-btn'>
                            <ArrowForwardIcon />{' '}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AllCollections;
