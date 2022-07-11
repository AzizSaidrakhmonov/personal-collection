import React from 'react';
import './topCollections.scss';
import TopCollectionImg from '../../images/top-collection-img.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const TopCollections = () => {
    return (
        <Carousel>
                <div>
                    <img src={TopCollectionImg} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={TopCollectionImg} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={TopCollectionImg} />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={TopCollectionImg} />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src={TopCollectionImg} />
                    <p className="legend">Legend 5</p>
                </div>
            </Carousel>
    );
};

export default TopCollections;
