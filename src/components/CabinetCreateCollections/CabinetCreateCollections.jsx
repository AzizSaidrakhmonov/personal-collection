import React, { useState, useContext, useEffect } from 'react';
import './cabinetCreateCollections.scss';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import FormData from 'form-data';

const CabinetCreateCollections = () => {
    const accessToken = localStorage.getItem('accessToken');

    const { oneUser } = useContext(UserContext);
    const { topics } = useContext(UserContext);
    const userId = oneUser.id;

    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');


    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (topics.length > 0) {
            setTopic(topics[0].name);
        }
    }, [topics]);


    const sendCollection = async (e) => {
        e.preventDefault();

        const imageData = new FormData();
        imageData.append('file', file, file.name)

        try {

            const res1 = await axios.post(`http://10.10.2.195:8080/api/image/profile/pic`,
                imageData,
                {
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'multipart/form-data',
                    },
                })
            
            const res2 = await axios.post(`http://10.10.2.195:8080/api/collection/add/${userId}`, {
                topic: topic,
                imageUrl: res1.data.data,
                name: name,
                description: description
            },
            {
                headers: {
                    Authorization: accessToken
                }
            })

            console.log(res1.data.data)
            console.log(res2.data)
            
 
    } catch(err) {
        console.log(err)
    }
}

    return (
        <div className='cabinet2'>
            <div className='cabinet2-top'>
                <div className='cabinet2-top__btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Collection
                    </button>
                </div>
            </div>
            {modal && (
                <div className='cabinet2-main'>
                    <div className='cabinet2-main__form '>
                        <form onSubmit={sendCollection}>
                            <div className='wrapper wrapper-top'>
                                <select
                                    name='topics'
                                    id='topics'
                                    onChange={(e) => {
                                        setTopic(e.target.value);
                                    }}
                                    className='cabinet2-main__form-input'
                                    style={{ cursor: 'pointer' }}
                                >
                                    {topics.map((topic) => {
                                        const {id, name} = topic;
                                        return (
                                        <option
                                            key={id}
                                            value={name}
                                            className='cabinet2-main__form-input'
                                            style={{ overflow: 'hidden' }}
                                        >
                                            {name}
                                        </option>
                                    )})}
                                </select>
                                <CloseIcon
                                    onClick={() => {
                                        setModal(false);
                                        setFile('');
                                    }}
                                    className='close-modal__icon'
                                />
                            </div>
                            <div className='wrapper upload-photo'>
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : 'https://www.colliver.io/wp-content/themes/consultix/images/no-image-found-360x260.png'
                                    }
                                    alt='create-collection'
                                />

                                <label htmlFor='file'>
                                    Choose an Image: <DriveFileMoveIcon className='label-icon' />
                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    type='file'
                                    name='file'
                                    id='file'
                                    className='cabinet2-main__form-input'
                                    accept='image/*'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    required
                                    className='cabinet2-main__form-input'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder='Description'
                                    required
                                    className='cabinet2-main__form-input'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <button 
                                    type='submit' 
                                    className='cabinet2-main__form-btn btn btn-primary'
                                    onClick={() => setTimeout(() => {
                                        setModal(false)
                                    }, [500])}
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CabinetCreateCollections;
