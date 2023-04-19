import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SouthIcon from '@mui/icons-material/South';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import styles from "../styles/Table.module.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
  
  export default function Table() {

    const admin = useSelector(selectUser).admin;
    const baseUrl = import.meta.env.VITE_REACT_API_URL;
    const [users,setUsers] = useState([]);

    useEffect(()=>{
      const getUsers = async () => {
        try {
          const res = await axios({
            method: 'get',
            url: `${baseUrl}/user/admin/users`,
            withCredentials: true
          });

        setUsers(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      
      getUsers();

    },[])



    const columns = [
      { field: '_id', headerName: 'ID', width: 300,headerAlign: 'center',align:'center'},
      {
        field: 'username',
        headerName: 'Username',
        width: 300,
        headerAlign: 'center',
        align:'center'
      },
      {
        field: 'email',
        headerName: 'E-mail',
        width: 400,
        headerAlign: 'center',
        align:'center'
      },
      {
          field: 'admin',
          headerName: 'Access Level',
          width: 200,
          headerAlign: 'center',
          align:'center',
          valueGetter: (params) => {
              return params.row.admin ? "Admin" : "User";
          }    
      },
      {
          field: "Actions", headerName:"Actions",width:300, headerAlign: 'center', align:'center', sortable: false, disableColumnMenu : true,
          renderCell: (params) => 
              <div>
                  <GridActionsCellItem
                      label='delete'
                      icon={<Tooltip title="Delete User"><DeleteIcon/></Tooltip>}
                      onClick={async () => {
                        try {
                          await axios({
                            method: 'delete',
                            url: `${baseUrl}/user/admin/delete/${params.row._id}`,
                            withCredentials: true
                          });
                  
                          setUsers((prev)=>{
                            return prev.filter((user) => user._id !== params.row._id);
                          });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                  />
                  <GridActionsCellItem
                      label='promote'
                      icon={<Tooltip title="Change to Admin"><UpgradeIcon/></Tooltip>}
                      onClick={async () => {
                        try {
                          await axios({
                            method: 'post',
                            url: `${baseUrl}/user/admin/add/${params.row._id}`,
                            withCredentials: true
                          });
                  
                          setUsers((prev)=>{
                            return prev.map((user) => {
                              if(user._id === params.row._id){
                                return {...user, admin : true};
                              }else{
                                return user ;
                              }
                            });
                          });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                  />
                  <GridActionsCellItem
                      label='demote'
                      icon={<Tooltip title="Remove from Admin"><SouthIcon/></Tooltip>}
                      onClick={async () => {
                        try {
                          await axios({
                            method: 'post',
                            url: `${baseUrl}/user/admin/delete/${params.row._id}`,
                            withCredentials: true
                          });
                  
                          setUsers((prev)=>{
                            return prev.map((user) => {
                              if(user._id === params.row._id){
                                return {...user, admin : false};
                              }else{
                                return user ;
                              }
                            });
                          });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                  />
              </div>
      }
      
    ];
    
    return admin ? (
      <Box sx={{ height:"80%", width: '80%',background:"white" }}>       
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(rows) => rows._id}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    ) : (<div className={styles.box}><NoAccountsIcon fontSize="large"/><span>You have no permission.</span></div>);
  }