import './users.scss';
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../../context/UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const users = useContext(UserContext);

    const [selectText, setSelectText] = useState('');
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken');

    useEffect(() => {
        selected.length === users?.length ? setSelectText('Remove All') : setSelectText('Select All');
    }, [selected, toggle]);
   
   
    const handleChange = (e) => {
        const id = +(e.target.value);
        if(selected?.includes(id)){
            setSelected([...selected.filter((e) => e != id)]);
        } else {
            setSelected([...selected, id]);
        }
    }


    const handleSelect = () => {
        if(selected.length === users?.length) {
            setSelected([])
        } else {
            const arr = new Set(users?.map(e => e.id));
            setSelected([...Array.from(arr)]);
        }
    }



        // HANDLE BLOCK
        const handleBlock = async() => {
            try{
                const res = await axios.put('http://itransitionlasttask.herokuapp.com/api/admin/change_state', {
                        arrId: selected, // selected users will block
                        state: false,
                    },
                    {
                        headers: {
                           "accessToken": `${accessToken}`
                        }
                    }
                )
                    console.log(res.data.statusCode)
                if(res.data.statusCode === 200){
                    setToggle(!toggle);
                } else if(res.data.statusCode === 401){
                    alert('Token is invalid');
                    navigate('/login')
                } else if(res.data.statusCode === 400){
                    alert(res.data.message);
                    navigate('/login');
                }
            } catch(err){
                console.log(err)
            }
        }
    //     //  HANDLE UNBLOCK

    //     const handleUnblock = () => {
    //         axios
    //             .put(``, {
    //                 arrId: selected, //selected users will unblock
    //                 statusCode: true,
    //             },
    //             {
    //                 headers: {
    //                     'accessToken': `${accessToken}`
    //                 }
    //             }
    //             )
    //             .then(res => {
    //                 if(res.data.statusCode === 200){
    //                     //sth
    //                 } else if(res.data.statusCode === 401){
    //                     alert('Token is invalid');
    //                     navigate('/');
    //                 } else if(res.data.statusCode === 400){
    //                     alert(res.data.message);
    //                     navigate('/');
    //                 }
    //             })
    //     }

    //    // HANDLE DELETE

    //    const handleDelete = () => {
    //         axios.
    //             delete(``, {  // your api here
    //                 headers: {
    //                     'accessToken': `${accessToken}`
    //                 }
    //             }
    //             )
    //             .then(res => {
    //                 if(res.data.statusCode === 200){
    //                     //sth
    //                 } else if(res.data.statusCode === 401){
    //                     alert('Token is invalid')
    //                     navigate('/')
    //                 } else if(res.data.statusCode === 400){
    //                     alert(res.data.message);
    //                     navigate('/')
    //                 }
    //             })
    //    }

    //

    

    return (
        <div className='users'>
            <div className='actions'>
                <input 
                    type='text' 
                    placeholder='search by name' 
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search}
                />
                <div className='action'>
                    <span className='action-btn btn btn-danger' onClick={handleBlock}>Block</span>
                    <span className='action-btn btn btn-success'>Unblock</span>
                    <span className='action-btn btn btn-warning'>Delete</span>
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
                                    className='users-grid__check btn btn-success'
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
                        {users.filter((user) => {
                            if(search == ''){
                                return user;
                            } else if(user.name.toLowerCase().includes(search.toLowerCase())){
                                return user;
                            }
                        }).map((e, i) => {
                            const {id, name, email, password, state, role} = e;
                                return (
                                    <tr key={id}>
                                        <td>
                                            <input 
                                                className='table-checkbox'
                                                type='checkbox' 
                                                value={id}  
                                                onChange={handleChange}
                                                checked={selected.includes(id)}
                                               
                                            />
                                        </td>
                                        <td>{i+1}</td>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                        <td className={`${state ? 'active' : 'block'}`}>{e.state ? 'Active' : 'Blocked'}</td>
                                        <td>
                                            <button className='btn btn-primary'>view</button>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
