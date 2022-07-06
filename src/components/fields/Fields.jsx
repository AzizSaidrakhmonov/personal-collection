import React, { useState, useEffect, useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './fields.scss';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../context/UserContext';

const Fields = () => {
    const [modal, setModal] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const { oneUser } = useContext(UserContext);
    const collectionId = localStorage.getItem('id');

    //////////////////////////////////////////////////////////////////

    const [formValues, setFormValues] = useState([{ name: '', type: '' }]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        setFormValues([...formValues, { name: '', type: '' }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        const jsonForm = JSON.stringify(formValues);

        // console.log(jsonForm);

        try {
            const res = await axios.post(
                `http://itransitionlasttask.herokuapp.com/api/field/add/${oneUser.id}/${collectionId}`,
                {
                    fieldRequestDtoList: jsonForm
                },

                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );

            console.log(jsonForm);

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    /////////////////////////////////////////////

    return (
        <div className='create-fields'>
            <div className='create-fields__top'>
                <div className='create-fields__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Field
                    </button>
                </div>
            </div>
            {modal && (
                <div className='create-fields__form'>
                    <form onSubmit={handleSubmit}>
                        <div className='create-fields__header'>
                            <h4>Fields</h4>
                            <CloseIcon
                                onClick={() => {
                                    setModal(false);
                                }}
                                className='close-modal__icon'
                            />
                        </div>
                        {formValues.map((element, index) => (
                            <div className='form-inline mt-3' key={index}>
                                <div className='form-inline__items'>
                                    <input
                                        type='text'
                                        name='name'
                                        value={element.name || ''}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder='Name'
                                    />
                                </div>
                                <div className='form-inline__items'>
                                    <select name='type' onChange={(e) => handleChange(index, e)}>
                                        <option className='option'>STRING</option>
                                        <option className='option'>INTEGER</option>
                                        <option className='option'>TEXT</option>
                                        <option className='option'>DATE</option>
                                        <option className='option'>BOOLEAN</option>
                                    </select>
                                </div>
                                <div className='form-inline__items'>
                                    {index ? (
                                        <button
                                            type='button'
                                            className='remove btn btn-danger'
                                            onClick={() => removeFormFields(index)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                        <div className='button-section mt-4'>
                            <button className='btn btn-success' type='button' onClick={() => addFormFields()}>
                                Add More Fields
                            </button>
                            <button className='btn btn-primary mx-3' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Fields;
