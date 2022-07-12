import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './users.scss';

import { useTranslation } from 'react-i18next';

const Users = () => {
    const [selectText, setSelectText] = useState('');
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);

    const { oneUser, users, getAllUsers } = useContext(UserContext);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        selected.length === users?.length ? setSelectText('Remove All') : setSelectText('Select All');
    }, [selected, toggle]);

    const handleChange = (e) => {
        const id = +e.target.value;
        if (selected?.includes(id)) {
            setSelected([...selected.filter((e) => e !== id)]);
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleSelect = () => {
        if (selected.length === users?.length) {
            setSelected([]);
        } else {
            const arr = new Set(users?.map((e) => e.id));
            setSelected([...Array.from(arr)]);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            userIdList: selected,
            state: 2,
        };
        try {
            const res = await axios.put(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/admin/change_state`, payload, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getAllUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const handleBlock = async (e) => {
        e.preventDefault();
        const payload = {
            userIdList: selected,
            state: 1,
        };

        try {
            const res = await axios.put(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/admin/change_state`, payload, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getAllUsers();

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnblock = async (e) => {
        e.preventDefault();

        const payload = {
            userIdList: selected,
            state: 0,
        };
        try {
            const res = await axios.put(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/admin/change_state`, payload, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getAllUsers();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://ec2-54-167-37-126.compute-1.amazonaws.com:8082/api/admin/change_role/${selected}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            getAllUsers();
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className='users'>
            <div className='actions'>
                <input
                    type='text'
                    placeholder={t('users search')}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <div className={`action ${`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}`}>
                    <span className='action-btn btn btn-danger' onClick={handleBlock}>
                        {t('users block')}
                    </span>
                    <span className='action-btn btn btn-success' onClick={handleUnblock}>
                        {t('users unblock')}
                    </span>
                    <span className='action-btn btn btn-warning' onClick={handleDelete}>
                        {t('users delete')}
                    </span>
                </div>
            </div>
            <div className='users-grid'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                <button
                                    type='button'
                                    onClick={handleSelect}
                                    className={`users-grid__check btn btn-success ${`${
                                        oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'
                                    }`}`}
                                >
                                    {selectText}
                                </button>
                            </th>
                            <th>No</th>
                            <th>Id</th>
                            <th>{t('users table name')}</th>
                            <th>{t('users table email')}</th>
                            <th>{t('users table role')}</th>
                            <th>{t('users table state')}</th>
                            <th>{t('users table actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) => {
                                if (search === '') {
                                    return user;
                                } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
                                    return user;
                                }
                            })
                            .map((e, i) => {
                                const { id, name, email, state, role } = e;
                                return (
                                    <tr key={id}>
                                        <td>
                                            <input
                                                className={`table-checkbox ${`${
                                                    oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'
                                                }`}`}
                                                type='checkbox'
                                                value={id}
                                                onChange={handleChange}
                                                checked={selected.includes(id)}
                                            />
                                        </td>
                                        <td>{i + 1}</td>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                        <td>{state}</td>
                                        <td>
                                            <button className='btn btn-primary'>{t('users table preview')}</button>
                                            <button className='btn btn-success mx-3' onClick={handleUser}>Change Role</button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
