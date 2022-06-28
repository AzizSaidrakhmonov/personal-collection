import React from 'react';
import './collectionsPage.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const CollectionsPage = () => {
    return (
        <div className='collections-page'>
            <Sidebar/>
            <div className="collections-page__container">
                <Navbar/>
            </div>
        </div>
    );
};

export default CollectionsPage;