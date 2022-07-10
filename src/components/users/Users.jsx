import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './users.scss';

const Users = () => {
    const [selectText, setSelectText] = useState('');
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);

    const { oneUser, users } = useContext(UserContext);

    const navigate = useNavigate();
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

    const handleDelete = () => {
        const payload = {
            userListId: selected,
            state: 2,
        };

        axios
            .delete(`http://192.168.43.127:8080/api/admin/change_state`, payload, {
                headers: {
                    Authorization: accessToken,
                },
            })
            .then((res) => {
                console.log(res.data)
                if (res.data.statusCode === 200) {
                    setToggle(!toggle);
                } else if (res.data.statusCode === 401 || res.data.statusCode === 403) {
                    alert('token is invalid');
                    navigate('/login');
                } else if (res.data.statusCode === 400) {
                    alert(res.data.message);
                    navigate('/login');
                }
            });
    };
    const handleBlock = () => {
        const payload = {
            userListId: selected,
            state: 0,
        };

        axios
            .put(`http://192.168.43.127:8080/api/admin/change_state`, payload, {
                headers: {
                    Authorization: accessToken,
                },
            })
            .then((res) => {
                console.log(res.data.data)
                if (res.data.statusCode === 200) {
                    setToggle(!toggle);
                } else if (res.data.statusCode === 401 || res.data.statusCode === 403) {
                    alert('token is invalid');
                    navigate('/login');
                } else if (res.data.statusCode === 400) {
                    alert(res.data.message);
                    navigate('/login');
                }
            });
    };

    const handleUnblock = () => {
        const payload = {
            userListId: selected,
            state: 1,
        };

        axios
            .put(
                `http://192.168.43.127:8080/api/admin/change_state`,
                payload,
                {
                    arrId: selected,
                    status: true,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            )
            .then((res) => {
                if (res.data.status === 200) {
                    setToggle(!toggle);
                } else if (res.data.status === 401) {
                    alert('token is invalid');
                    navigate('/');
                } else if (res.data.status === 400) {
                    alert(res.data.message);
                    navigate('/');
                }
            });
    };

    return (
        <div className='users'>
            <div className='actions'>
                <input
                    type='text'
                    placeholder='Search by Name'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <div className={`action ${`${oneUser.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}`}>
                    <span className='action-btn btn btn-danger' onClick={handleBlock}>
                        Block
                    </span>
                    <span className='action-btn btn btn-success' onClick={handleUnblock}>
                        Unblock
                    </span>
                    <span className='action-btn btn btn-warning' onClick={handleDelete}>
                        Delete
                    </span>
                    <span className='action-btn btn btn-info'>Admin</span>
                    <span className='action-btn btn btn-dark'>User</span>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                        <td className={`${state ? 'active' : 'block'}`}>
                                            {e.state === 1 ? 'Active' : e.state === 0 ? 'Blocked' : e.state}
                                        </td>
                                        <td>
                                            <button className='btn btn-primary'>view</button>
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
