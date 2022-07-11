import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context/ToggleSidebar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';
import CollectionsIcon from '@mui/icons-material/Collections';
import TagIcon from '@mui/icons-material/Tag';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';

import { useTranslation } from 'react-i18next';
import { DarkModeContext } from '../../context/DarkModeContext';

const Sidebar = () => {
    const { activeMenu } = useStateContext();
    const {dispatch} = useContext(DarkModeContext)
    const { t, i18n } = useTranslation();

    return (
        <>
            {activeMenu && (
                <div className='sidebar'>
                    <div className='sidebar-top'>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <h1 className='sidebar-logo'>
                                {t('logo personal')} <sub>{t('logo collections')}</sub>
                            </h1>
                        </Link>
                    </div>
                    <div className='sidebar-center'>
                        <ul className='sidebar-dashboard'>
                            <p className='sidebar-dashboard__title'>{t('sidebar main')}</p>
                            <Link to='/allCollections' style={{ textDecoration: 'none' }}>
                                <li className='sidebar-dashboard__item'>
                                    <CollectionsIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar main collections')}
                                </li>
                            </Link>
                            <Link to='/allUsers' style={{ textDecoration: 'none' }}>
                                <li className='sidebar-dashboard__item'>
                                    <GroupIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar main users')}
                                </li>
                            </Link>
                            <Link to='/tags' style={{ textDecoration: 'none' }}>
                                <li className='sidebar-dashboard__item'>
                                    <TagIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar main tags')}
                                </li>
                            </Link>

                            <p className='sidebar-dashboard__title'>{t('sidebar user')}</p>
                            <Link to='/personalCabinet' style={{ textDecoration: 'none' }}>
                                <li className='sidebar-dashboard__item'>
                                    <PersonIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar user personal cabinet')}
                                </li>
                            </Link>
                            <Link
                                to='/login'
                                style={{ textDecoration: 'none' }}
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    localStorage.removeItem('email');
                                }}
                            >
                                <li className='sidebar-dashboard__item'>
                                    <LogoutIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar user logout')}
                                </li>
                            </Link>

                            <p className='sidebar-dashboard__title'>{t('sidebar settings')}</p>
                            <Link to='/language' style={{ textDecoration: 'none' }}>
                                <li className='sidebar-dashboard__item'>
                                    <LanguageIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar settings language')}
                                </li>
                            </Link>
                                <li className='sidebar-dashboard__item mode'>
                                    <PaletteIcon className='sidebar-dashboard__icon' />
                                    {t('sidebar settings theme')}
                                    <span className='light' onClick={() => dispatch({type: 'LIGHT'})}></span>
                                    <span className='dark' onClick={() => dispatch({type: 'DARK'})}></span>
                                </li>
                            
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
