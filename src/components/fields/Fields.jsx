import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './fields.scss';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Fields = () => {
    const [modal, setModal] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    //////////////////////////////////////////////////////////////////

    const [formValues, setFormValues] = useState([{ name: '', option: '' }]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        setFormValues([...formValues, { name: '', option: '' }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = (event) => {
        event.preventDefault();
        
        alert(JSON.stringify(formValues));
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
                                    <select name='option'>
                                        <option className='option' name='STRING' value={element.name || ''} onChange={(e) => handleChange(index, e)}>
                                            STRING
                                        </option>
                                        <option className='option' name='INTEGER' value={element.name || ''} onChange={(e) => handleChange(index, e)}>
                                            INTEGER
                                        </option>
                                        <option className='option' name='TEXT' value={element.name || ''} onChange={(e) => handleChange(index, e)}>
                                            TEXT
                                        </option>
                                        <option className='option' name='DATE' value={element.name || ''} onChange={(e) => handleChange(index, e)}>
                                            DATE
                                        </option>
                                        <option className='option' name='BOOLEAN' value={element.name || ''} onChange={(e) => handleChange(index, e)}>
                                            BOOLEAN
                                        </option>
                                    </select>
                                </div>
                                <div className='form-inline__items'>
                                    {index ? (
                                        <button
                                            type='button'
                                            className='remove btn btn-danger'
                                            onClick={() => removeFormFields(index)}
                                        >
                                            <DeleteIcon/>   
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
