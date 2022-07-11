import React, { useContext, useMemo } from 'react';
import './topCollections.scss';
import TopCollectionImg from '../../images/top-collection-img.jpg';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { UserContext } from '../../context/UserContext';

const TopCollections = () => {
    const { topCollections } = useContext(UserContext);

    console.log(topCollections);

    const ItemElement = useMemo(() => {
        if (topCollections.collectionList) {
            return (
                <Carousel>
                    {topCollections.collectionList.map((topCollection) => {
                        const { name, id, imageUrl, description, topic } = topCollection;
                        return (
                            <div className='card' key={id}>
                                <h4>{name}</h4>
                                <img src={imageUrl} alt={name} />
                                <p className='legend'>{name}</p>
                            </div>
                        );
                    })}
                </Carousel>
            );
        }
    });

    const CollectionItem = useMemo(() => {
        if (topCollections.itemList) {
            return (
                <div>
                    {topCollections.itemList.map((item) => {
                        const { name, id } = item;
                        return (
                            <div key={id}>
                                <h4>{name}</h4>
                            </div>
                        );
                    })}
                </div>
            );
        }
    });

    return (
        <>
            <div className='slick'>{ItemElement}</div>
            <div>{CollectionItem}</div>
        </>
    );
};

export default TopCollections;
