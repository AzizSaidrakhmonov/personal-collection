import React from 'react';
import './navbar.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStateContext } from '../../context/ToggleSidebar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { setActiveMenu } = useStateContext();
    return (
        <div className='navbar'>
            <div className='navbar-button'>
                <MenuIcon onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} />
            </div>
            <div className='navbar-search'>
                <input autoComplete='true' type='text' name='text' placeholder='Search...' />
                <SearchIcon className='navbar-search__icon' />
            </div>
            <div className='nav-buttons'>
                <Link to='/login'>
                    <button className='btn btn-success mx-3'>Log In</button>
                </Link>
                <Link to='/register'>
                    <button className='btn btn-primary'>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
