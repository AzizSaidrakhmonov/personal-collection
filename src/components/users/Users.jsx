import './users.scss';
import * as React from 'react';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../../context/UserContext';


const Users = () => {

   const allUsers = useContext(UserContext)
   console.log(allUsers)

//     // HANDLE BLOCK
//     const handleBlock = () => {
//         axios
//             .put(``, {
//                     arrId: selected, // selected users will block
//                     statusCode: false,
//                 },
//                 {
//                     headers: {
//                         "accessToken": `${accessToken}`
//                     }
//                 }
//             )
//             .then(res => {
//                 if(res.data.statusCode === 200){
//                     //sth
//                 } else if(res.data.statusCode === 401){
//                     alert('Token is invalid');
//                     navigate('/')
//                 } else if(res.data.statusCode === 400){
//                     alert(res.data.message);
//                     navigate('/');
//                 }
//             });
//     }

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


    const actionColumn  = [
        {action: 'action', headerName: 'Action', width: 200, renderCell:() => {
            return (
                <div className='cellAction'>
                    <div className='btn btn-primary'>View</div>
                </div>
            )
        }}
    ]
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'password', headerName: 'Password', width: 130 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
      ];

      const rows = [
        { id: 1, name: 'Snow', email: 'Jon', password: 35, role: 'admin', status: 'active' },
        { id: 2, name: 'Lannister', email: 'Cersei', password: 42, role: 'admin', status: 'active' },
        { id: 3, name: 'Lannister', email: 'Jaime', password: 45, role: 'admin', status: 'active' },
        { id: 4, name: 'Stark', email: 'Arya', password: 16, role: 'admin', status: 'active' },
        { id: 5, name: 'Targaryen', email: 'Daenerys', password: 222, role: 'admin', status: 'active' },
        { id: 6, name: 'Melisandre', email: 'asaydraxmonov@mail.com', password: 150, role: 'admin', status: 'active' },
        { id: 7, name: 'Clifford', email: 'Ferrara', password: 44, role: 'admin', status: 'active' },
        { id: 8, name: 'Frances', email: 'Rossini', password: 36, role: 'admin', status: 'active' },
        { id: 9, name: 'Roxie', email: 'Harvey', password: 65, role: 'admin', status: 'active' },
      ];

    return (
        <div className='users'>
            <div className="actions">
                <input type='text' placeholder='search by name' />
                <div className="action">
                    <span className="action-btn btn btn-danger">Block</span>
                    <span className="action-btn btn btn-success">Unblock</span>
                    <span className="action-btn btn btn-warning">Delete</span>
                    <span className="action-btn btn btn-info">Admin</span>
                    <span className="action-btn btn btn-dark">User</span>
                </div>
            </div>
            <div className='users-grid'>
                <DataGrid
                    rows={rows}
                    columns={columns.concat(actionColumn)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default Users;