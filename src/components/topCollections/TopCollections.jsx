import React from 'react';
import './topCollections.scss';
// import axios from 'axios';
// import TopCollectionImg from '../../images/top-collection-img.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const TopCollections = () => {
    return (
        <div className='collections'>
            <div className='top-collections'>
                <div className='top-collection'>
                    {/* <img className='top-collection__img' src={TopCollectionImg} alt='collection-img' /> */}
                    <div className='name'>Book</div>
                    <div className='topic'>Topic</div>
                    <div className='description'>Description</div>
                </div>
                <div className='top-collection'>
                    {/* <img className='top-collection__img' src={TopCollectionImg} alt='collection-img' /> */}
                    <div className='name'>Book</div>
                    <div className='topic'>Topic</div>
                    <div className='description'>Description</div>
                </div>
                <div className='top-collection'>
                    {/* <img className='top-collection__img' src={TopCollectionImg} alt='collection-img' /> */}
                    <div className='name'>Book</div>
                    <div className='topic'>Topic</div>
                    <div className='description'>Description</div>
                </div>
                <div className='top-collection'>
                    {/* <img className='top-collection__img' src={TopCollectionImg} alt='collection-img' /> */}
                    <div className='name'>Book</div>
                    <div className='topic'>Topic</div>
                    <div className='description'>Description</div>
                </div>
                <div className='top-collection'>
                    {/* <img className='top-collection__img' src={TopCollectionImg} alt='collection-img' /> */}
                    <div className='name'>Book</div>
                    <div className='topic'>Topic</div>
                    <div className='description'>Description</div>
                </div>
            </div>
            <div className='top-items'></div>
        </div>
    );
};

export default TopCollections;
