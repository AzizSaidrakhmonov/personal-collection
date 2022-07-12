import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './navbar.scss';
import { useStateContext } from '../../context/ToggleSidebar';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [searchBar, setSearchBar] = useState([]);
    const [selected, setSelected] = useState([]);

    const { setActiveMenu } = useStateContext();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/search/get').then((res) => {
            setSearchBar(res.data?.data);
            console.log(res.data.data)
        });
    }, []);

    useEffect(() => {
        if (selected.length) {
            const found = searchBar.find((e) => e?.title === selected[0]);
            console.log(found);
            navigate(`item/${found?._id}`);
        }
    }, [selected]);

    return (
        <div className='navbar'>
            <div>
                <div className='navbar-button'>
                    <MenuIcon onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} />
                </div>
                <div className='navbar-search'>
                    <input
                        autoComplete='true'
                        type='text'
                        name='text'
                        placeholder={t('navbar search')}
                        onChange={setSelected}
                        options={searchBar?.map((e) => e?.title)}
                    />
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
