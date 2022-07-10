import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './tags.scss';
import { useTranslation } from 'react-i18next';

const Tags = () => {
    const { tags } = useContext(UserContext);
    const { t, i18n } = useTranslation();

    return (
        <div className='create-tags'>
            <h2 className='tags-header'>{t('tags all')}</h2>
            <div className='create-tags__main'>
                {tags.map((tag) => {
                    const { id, name } = tag;
                    return (
                        <div className='create-tags__item' key={id}>
                            <div className='create-tags__item-name'>
                                <span>{t('tags name')}:</span>
                                <p>{name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tags;
