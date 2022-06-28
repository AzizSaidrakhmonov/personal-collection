import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './cabinetPage2.scss';
import Cabinet2 from '../../components/cabinet2/Cabinet2';

const CabinetPage2 = () => {
    return (
        <div className='cabinet-page2'>
            <Sidebar />
            <div className='cabinet-page2__container'>
                <Navbar />
                <Cabinet2 />
            </div>
        </div>
    );
};

export default CabinetPage2;
