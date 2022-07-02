import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Pagination = ({ postsPerPage, totalPosts, paginate, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <main>
            {pageNumbers.map((number, index) => {
                return (
                    <button
                        key={index}
                        className={`page-btn ${index + 1 === paginate ? 'active-btn' : null}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {number}
                    </button>
                );
            })}
        </main>
    );
};

export default Pagination;
