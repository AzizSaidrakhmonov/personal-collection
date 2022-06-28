import React from 'react';
import Cabinet from '../../components/cabinet/Cabinet';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './cabinetPage.scss';

const CabinetPage = () => {
    return (
        <div className='cabinet-page'>
            <Sidebar/>
            <div className="cabinet-page__container">
                <Navbar/>
                <Cabinet/>
            </div>
        </div>
    );
};

export default CabinetPage;