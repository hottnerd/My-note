import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "../styles/FormModal.module.css";
import { useSpring, animated } from '@react-spring/web';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',

};

const baseUrl = import.meta.env.VITE_REACT_API_URL;

export default function FormModal({show , hide , setNotes}) {

  const titleInput = useRef();
  const textInput = useRef();
  const [error,setError] = useState({title:false,text:false});
  
  const onSubmitHandle = async () => {

    if((titleInput.current.value === "") && (textInput.current.value === "")){
      setError({title:true,text:true});
      return;
    }else if((titleInput.current.value === "")){
      setError({title:true,text:false});
      titleInput.current.focus();
      return;
    }else if((textInput.current.value === "")){
      setError({title:false,text:true});
      textInput.current.focus();
      return;
    }

    try {

      const res = await axios({
        method: 'post',
        url: `${baseUrl}/note/add`,
        data: {
          title : titleInput.current.value,
          text : textInput.current.value
        },
        withCredentials: true
      });

      setNotes((prev) => {
        return [...prev,res.data];
      });

      setError({title:false,text:false});
      hide();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={show}
        onClose={()=>{
          setError({title:false,text:false});
          hide();
          }
        }
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
          <form className={styles.formContainer}>
                <h1>Add Note</h1>
                <TextField
                  sx={{ marginBottom : "2rem"}}
                  inputRef={titleInput} 
                  error={error.title} 
                  label="Title"  
                  color="success" 
                  variant="outlined" 
                />
                <TextField 
                  sx={{ marginBottom : "2rem"}}
                  inputRef={textInput} 
                  error={error.text} 
                  label="Text"  
                  color="success" 
                  variant="outlined"   
                  multiline
                  maxRows={10}               
                />
                <div className={styles.buttonContainer}>
                  {(error.title || error.text) && <div className={styles.errorMessage}>* Please fill out all fields.</div>}
                  <Button
                    onClick={onSubmitHandle} 
                    variant="contained" 
                    color="success" 
                    size='large' 
                    fullWidth>
                      Submit
                  </Button>  
                </div>               
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
