import React from 'react';
import './sidebar.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CollectionsIcon from '@mui/icons-material/Collections';
import TagIcon from '@mui/icons-material/Tag';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context/ToggleSidebar';

const Sidebar = () => {
    const {activeMenu} = useStateContext();
    
    return (
      <>
        { activeMenu && (

                    <div className='sidebar'>
                        <div className='sidebar-top'>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                        <h1 className='sidebar-logo'>
                                    Personal <sub>Collections</sub>
                                </h1>
                            </Link>
                            </div>
                            <div className='sidebar-center'>
                            <ul className='sidebar-dashboard'>
                                <p className='sidebar-dashboard__title'>Main</p>
                                <Link to='/allCollections' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <CollectionsIcon className='sidebar-dashboard__icon' />
                                        Collections
                                    </li>
                                </Link>
                                <Link to='/allUsers' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <GroupIcon className='sidebar-dashboard__icon' />
                                        Users
                                    </li>
                                </Link>
                                <Link to='/tags' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <TagIcon className='sidebar-dashboard__icon' />
                                        Tags
                                    </li>
                                </Link>

                                <p className='sidebar-dashboard__title'>User</p>
                                <Link to='/personalCabinet' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <PersonIcon className='sidebar-dashboard__icon' />
                                        Personal Cabinet
                                    </li>
                                </Link>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <LogoutIcon className='sidebar-dashboard__icon' />
                                        Logout
                                    </li>
                                </Link>

                                <p className='sidebar-dashboard__title'>Settings</p>
                                <Link to='/language' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <LanguageIcon className='sidebar-dashboard__icon' />
                                        Language
                                    </li>
                                </Link>
                                <Link to='/theme' style={{ textDecoration: 'none' }}>
                                    <li className='sidebar-dashboard__item'>
                                        <PaletteIcon className='sidebar-dashboard__icon' />
                                        Theme
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
        )}
      </>
    );
};

export default Sidebar;
