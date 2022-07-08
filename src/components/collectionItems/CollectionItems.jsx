import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './collectionItems.scss';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const CollectionItems = () => {
    const { oneUser, tags, fields } = useContext(UserContext);

    const [modal, setModal] = useState(false);
    const [itemName, setItemName] = useState('');
    const [tag, setTag] = useState('');

    const accessToken = localStorage.getItem('accessToken');
    const collectionId = localStorage.getItem('id');

    useEffect(() => {
        if (tags.length > 0) {
            setTag(tags[0].name);
        }
    }, [tags]);

    ///////////////////////////////////////////////////////////////////////////////////////

    const [formValues, setFormValues] = useState([{ name: 'This is first tag' }]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {
        setFormValues([...formValues, { name: 'This is first tag' }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    const jsonForm = JSON.stringify(formValues);

    console.log(jsonForm);

    ///////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        fields.map(() => {
            fieldValues.push({ data: '' });
        });
    }, [fields]);

    const [fieldValues, setFieldValues] = useState([]);
    console.log(fields);

    let handleFieldChange = (i, e) => {
        let newFieldValues = [...fieldValues];
        newFieldValues[i][e.target.name] = e.target.value;
        setFieldValues(newFieldValues);
    };

    const jsonFieldForm = JSON.stringify(fieldValues);

    console.log(jsonFieldForm);

    //////////////////////////////////////////////////////////////////////////////////////

    const sendCreatedCollectionItem = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `http://10.10.2.168:8080/api/item/add/${oneUser.id}/${collectionId}`,
                {
                    itemName: itemName,

                    field: {
                        fieldList: jsonFieldForm,
                    },

                    tag: {
                        tagList: jsonForm,
                    },
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );

            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        sendCreatedCollectionItem();
    }, []);

    return (
        <div className='create-items'>
            <div className='create-items__top'>
                <div className='create-items__top-btn'>
                    <button onClick={() => setModal(true)} className='btn btn-success'>
                        Create New Item
                    </button>
                    <Link to='/fields'>
                        <button className='btn btn-success mx-3'>Fields</button>
                    </Link>
                </div>
            </div>
            {modal && (
                <div className='create-items__form'>
                    <form onSubmit={sendCreatedCollectionItem}>
                        <CloseIcon
                            onClick={() => {
                                setModal(false);
                            }}
                            className='close-modal__icon'
                        />
                        <div className='wrapper'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Name'
                                required
                                className='create-items__form-input'
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        {formValues.map((element, index) => (
                            <div className='wrapper wrapper-line'>
                                <select
                                    name='name'
                                    id='name'
                                    onChange={(e) => handleChange(index, e)}
                                    className='collection-items__form-input '
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tags.map((tag) => {
                                        const { id, name } = tag;
                                        return (
                                            <option
                                                key={id}
                                                value={name}
                                                className='collection-items__form-input '
                                                style={{ overflow: 'hidden' }}
                                            >
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>

                                {index ? (
                                    <button
                                        type='button'
                                        className='button remove'
                                        onClick={() => removeFormFields(index)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                ) : null}
                            </div>
                        ))}

                        <div className='button-section'>
                            <button className='btn btn-primary add' type='button' onClick={() => addFormFields()}>
                                + Add More Tags
                            </button>
                        </div>

                        <h4>Added fields:</h4>

                        <div className='wrapper-fields'>
                            {fields.map((field, i) => {
                                const { id, name, type } = field;
                                switch (type) {
                                    case 'STRING':
                                        return (
                                            <div className='field-type' key={id}>
                                                <label id='name' className='field-type__label'>
                                                    {name}:
                                                </label>
                                                <input
                                                    type='name'
                                                    name='data'
                                                    id='name'
                                                    className='collection-items__form-input '
                                                    required
                                                    onChange={(e) => handleFieldChange(i, e)}
                                                />
                                            </div>
                                        );

                                    case 'INTEGER':
                                        return (
                                            <div className='field-type'>
                                                <label id='number' className='field-type__label'>
                                                    {name}:
                                                </label>
                                                <input
                                                    type='number'
                                                    name='data'
                                                    id='number'
                                                    required
                                                    className='collection-items__form-input '
                                                    onChange={(e) => handleFieldChange(i, e)}
                                                />
                                            </div>
                                        );
                                    case 'TEXT':
                                        return (
                                            <div className='field-type'>
                                                <label id='text' className='field-type__label'>
                                                    {name}:
                                                </label>
                                                <textarea
                                                    type='text'
                                                    name='data'
                                                    id='text'
                                                    required
                                                    className='collection-items__form-input '
                                                    onChange={(e) => handleFieldChange(i, e)}
                                                ></textarea>
                                            </div>
                                        );
                                    case 'DATE':
                                        return (
                                            <div className='field-type'>
                                                <label id='date' className='field-type__label'>
                                                    {name}:
                                                </label>
                                                <input
                                                    type='date'
                                                    name='data'
                                                    id='date'
                                                    required
                                                    className='collection-items__form-input '
                                                    onChange={(e) => handleFieldChange(i, e)}
                                                />
                                            </div>
                                        );
                                    case 'BOOLEAN':
                                        return (
                                            <div className='field-type'>
                                                <label id='checkbox' className='field-type__label'>
                                                    {name}:
                                                </label>
                                                <input
                                                    type='checkbox'
                                                    name='data'
                                                    id='checkbox'
                                                    required
                                                    className='collection-items__form-input boolean '
                                                    onChange={(e) => handleFieldChange(i, e)}
                                                />
                                            </div>
                                        );
                                    default:
                                        return <div>...</div>;
                                }
                            })}
                        </div>
                        <div className='wrapper create-items__form-btn'>
                            <input
                                type='submit'
                                value='Add'
                                required
                                className='create-items__inner-btn btn btn-primary mt-3'
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CollectionItems;
