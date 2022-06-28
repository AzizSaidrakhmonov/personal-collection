import React from 'react';
import './navbar.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-button'>
                <MenuIcon />
            </div>
            <div className='navbar-search'>
                <input autoComplete='true' type='text' name='text' placeholder='Search...' />
                <SearchIcon className='navbar-search__icon' />
            </div>
        </div>
    );
};

export default Navbar;
