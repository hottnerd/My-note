import React, { useEffect, useState } from 'react'
import styles from "../styles/Main.module.css"
import Navbar from '../components/Navbar'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import Note from '../components/Note';
import FormModal from '../components/FormModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserStatus } from '../redux/userSlice';
import axios from 'axios';
import UpdateModal from '../components/UpdateModal';



export default function Main() {
  
  const baseUrl = import.meta.env.VITE_REACT_API_URL;
  const userStatus = useSelector(getUserStatus);
  const navigate = useNavigate();

  const [notes,setNotes] = useState([]);
  const [addModal,setAddModal] = useState(false);
  const [update,setUpdate] = useState();

  const updateModal = Boolean(update);

  const fetchNotes = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${baseUrl}/note`,
        withCredentials: true
      });

    setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(userStatus !== "succeeded"){
      navigate("/login");
    }
  
    fetchNotes();

  },[]);


  return userStatus === "succeeded"? (
    <>
        <Navbar/>
        <div className={styles.bodyContainer}>
            {notes.map((note)=>{
              return (<Note note={note} key={note._id} setNotes={setNotes} setUpdate={setUpdate}/>);
            })}
        </div>
        <Fab sx={{ position:"fixed" ,bottom:"40px",left:"40px"}} aria-label="add">
            <Tooltip title="Add Note">
                <AddIcon onClick={()=>{setAddModal(true)}}/>
            </Tooltip>
        </Fab>
        <FormModal show={addModal} hide={()=>{setAddModal(false)}} setNotes={setNotes}/>
        <UpdateModal show={updateModal} note={update} hide={()=>{setUpdate(null)}} setNotes={setNotes}/>
    </>
  ) : null;
}
