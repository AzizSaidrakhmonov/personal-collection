import React from 'react';
import './language.scss';
import i18n from '../../i18n';

import { useTranslation } from 'react-i18next';


const Language = () => {
    
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        return () => {
            i18n.changeLanguage(lng)
        }
    }
    return (
        <div className='language'>
            <h4 className="language-title">
                {t('choose a language')}
            </h4>
            <div className="language-btns">
                <button className='btn btn-outline-success' onClick={changeLanguage('en')}>{t('english language')}</button>
                <button className='btn btn-outline-success' onClick={changeLanguage('uz')}>{t('uzbek language')}</button>
            </div>
        </div>
    );
};

export default Language;