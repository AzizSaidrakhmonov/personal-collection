import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss';
import { useStateContext } from '../../context/ToggleSidebar';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { setActiveMenu } = useStateContext();

    const { t, i18n } = useTranslation();

    return (
        <div className='navbar'>
            <div>
                <div className='navbar-button'>
                    <MenuIcon onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} />
                </div>
                <div className='navbar-search'>
                    <input autoComplete='true' type='text' name='text' placeholder={t('navbar search')} />
                    <SearchIcon className='navbar-search__icon' />
                </div>
            </div>
            <div className='nav-buttons'>
                <Link to='/login'>
                    <button className='btn btn-success mx-3'>{t('navbar login')}</button>
                </Link>
                <Link to='/register'>
                    <button className='btn btn-primary'>{t('navbar signup')}</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
