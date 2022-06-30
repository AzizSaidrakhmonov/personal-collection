import React, {useContext} from 'react';
import './navbar.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStateContext } from '../../context/ToggleSidebar';

const Navbar = () => {
    const {setActiveMenu} = useStateContext();
    return (
        <div className='navbar'>
            <div className='navbar-button'>
                <MenuIcon onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}/>
            </div>
            <div className='navbar-search'>
                <input autoComplete='true' type='text' name='text' placeholder='Search...' />
                <SearchIcon className='navbar-search__icon' />
            </div>
        </div>
    );
};

export default Navbar;
