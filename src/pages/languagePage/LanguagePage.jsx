import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './languagePage.scss';

const LanguagePage = () => {
    return (
        <div className='language-page'>
            <Sidebar />
            <div className='language-page__container'>
                <Navbar />
            </div>
        </div>
    );
};

export default LanguagePage;
