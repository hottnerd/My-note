import React from 'react'
import styles from "../styles/Note.module.css"
import { Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

export default function Note({note , setNotes , setUpdate}) {

  const baseUrl = import.meta.env.VITE_REACT_API_URL;
  const user = useSelector(selectUser);
  const onClickHandle = async () => {
    try {
      await axios({
        method: 'delete',
        url: `${baseUrl}/note/delete/${note._id}`,
        withCredentials: true
      });

      setNotes((prev) => {
        return prev.filter((prevNote) => note._id !== prevNote._id);
      });

    } catch (err) {
      console.log(err);
    }
  };

  const creator = (note.userId.username.length > 10) ? `${note.userId.username.slice(0,10)}...` : note.userId.username ;

  return (
    <div className={styles.container}>
        {((user._id === note.userId._id) || user.admin) &&
        (<div className={styles.deleteContainer}>
          <Tooltip title="Delete">
            <DeleteIcon onClick={onClickHandle}></DeleteIcon>
          </Tooltip>
        </div>)}
        {((user._id === note.userId._id) || user.admin) &&
        (<div className={styles.updateContainer}>
          <Tooltip title="Edit">
            <EditIcon onClick={()=>{setUpdate(note)}}></EditIcon>
          </Tooltip>
        </div>)}
        <h2>{note.title}</h2>
        <div>{(note.text.length > 300 ? `${note.text.slice(0,300)}...` : note.text)}</div>
        <div className={styles.createdBy}>{`created by ${creator}`}</div>
    </div>
  )
}
