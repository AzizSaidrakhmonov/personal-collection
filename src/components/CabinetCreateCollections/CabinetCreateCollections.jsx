import React, { useState, useContext, useEffect } from 'react';
import './cabinetCreateCollections.scss';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const CabinetCreateCollections = () => {
    const { oneUser } = useContext(UserContext);
    // console.log(oneUser.id)

    const [file, setFile] = useState('');
    const [modal, setModal] = useState(false);

    const sendCreatedCollection = async (e) => {
        e.preventDefault();

        const { topic, file, name, description } = e.target.elements;

        const res = await axios.post(`http://itransitionlasttask.herokuapp.com/api/collection/add/${oneUser.id}`, {
            topic: topic.value,
            file: file.value,
            name: name.value,
            description: description.value,
        });
        console.log(res);

        if (res.data.statusCode === 200) {
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
                                <input
                                    type='text'
                                    name='topic'
                                    placeholder='Topic'
                                    required
                                    className='cabinet2-main__form-input'
                                />
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
                                />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    name='description'
                                    placeholder='Description'
                                    required
                                    className='cabinet2-main__form-input'
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
