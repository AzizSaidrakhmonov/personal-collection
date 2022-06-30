import React, { useState } from 'react';
import './cabinet2.scss';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';

const Cabinet2 = () => {
    const [file, setFile] = useState('');
    const [modal, setModal] = useState(false);
   
    console.log(file)
    return (
        <div className='cabinet2'>
            <div className='cabinet2-top'>
                <div className='cabinet2-top__btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create new collection
                    </button>
                </div>
            </div>
            {modal && (
                <div className='cabinet2-main'>
                    <div className='cabinet2-main__form '>
                        <form>
                            <div className='wrapper wrapper-top'>
                                <input type='text' placeholder='Topic' className='cabinet2-main__form-input' required />
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
                                />

                           
                                <label htmlFor='file'>
                                    Choose an Image: <DriveFileMoveIcon className='label-icon' />
                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    type='file'
                                    id='file'
                                    className='cabinet2-main__form-input'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className='wrapper'>
                                <input type='text' placeholder='Name' className='cabinet2-main__form-input' required />
                            </div>
                            <div className='wrapper'>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    className='cabinet2-main__form-input'
                                    required
                                />
                                <button
                                    type='submit'
                                    className='cabinet2-main__form-btn btn btn-primary'
                                    onClick={(e) => {
                                        
                                    }}
                                >Add</button>
                            </div>
                    
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cabinet2;
