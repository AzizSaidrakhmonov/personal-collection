import React, { useState, useContext, useEffect } from 'react';
import './cabinetCreateCollections.scss';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const CabinetCreateCollections = () => {
    const accessToken = localStorage.getItem('accessToken');

    const { oneUser } = useContext(UserContext);
    const { topics } = useContext(UserContext);
    const userId = oneUser.id;

    // console.log(userId)
    // console.log(topics);

    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');

    const [modal, setModal] = useState(false);

    // console.log(file);

    const sendCreatedCollection = async (e) => {
        e.preventDefault();

        // const { topic, name, description } = e.target.elements;
        // const {file} = e.target.files[0]

        const formData = new FormData();
        formData.append('topic', topic);
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);

        console.log(formData)

        try {
            const res = await axios.post(
                `http://itransitionlasttask.herokuapp.com/api/collection/add/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: accessToken,
                        'content-type': 'multipart/form-data',
                    },
                },
            );
            // console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        sendCreatedCollection();
    }, []);

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
                        <form onSubmit={sendCreatedCollection}>
                            <div className='wrapper wrapper-top'>
                                <select
                                    name='topics'
                                    value={(e) => setTopic(e.target.topic.value)}
                                    // onChange={(e) => setTopic(e.target.topic.value)}
                                    className='cabinet2-main__form-input'   
                                    style={{ cursor: 'pointer' }}
                                >
                                    {topics.map((topic) => {
                                        const { name } = topic;
                                        return (
                                            <option
                                                value={name}
                                                className='cabinet2-main__form-input'
                                                style={{ overflow: 'hidden' }}
                                                onChange={(e) => setTopic(e.target.value)}  
                                            >
                                                {name}
                                            </option>
                                        );
                                    })}
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
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    name='name'
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
                                    placeholder='Description'
                                    required
                                    className='cabinet2-main__form-input'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <button type='submit' className='cabinet2-main__form-btn btn btn-primary'>
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
