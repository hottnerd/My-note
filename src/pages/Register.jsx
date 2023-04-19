import React, { useRef, useState } from 'react'
import styles from "../styles/Register.module.css"
import TextField from '@mui/material/TextField';
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';


export default function Register() {
  
  const navigate = useNavigate();



  const [error,setError] = useState(false);
  const usernameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const confirmPasswordInput = useRef();


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_REACT_API_URL;

    try {
      if (usernameInput.current.value === "") {
        usernameInput.current.focus();
        throw new Error("*Username required");
      }else if (emailInput.current.value === "") {
        emailInput.current.focus();
        throw new Error("*E-mail required");
      }else if (!validator.isEmail(emailInput.current.value)) {
        emailInput.current.value = "";
        emailInput.current.focus();
        throw new Error("*Invalid e-mail");      
      }else if (passwordInput.current.value === "") {
        passwordInput.current.focus();
        throw new Error("*Password required");
      }else if (passwordInput.current.value !== confirmPasswordInput.current.value){
        throw new Error("*Password doesn't match");
      }

      await axios({
        method: 'post',
        url: `${baseUrl}/user/register`,
        data: {
          username : usernameInput.current.value,
          password : passwordInput.current.value,
          email : emailInput.current.value
        },
        withCredentials: true
      });

      navigate("/");

    } catch(err) {  
      if(err?.name === "AxiosError"){
        setError(err.response.data.error);
      }else{
        setError(err.message);
      }
     

    }
  };

  return (
    <div className={styles.container}>
        <form>
            <h1>Sign Up</h1>
            <TextField 
              inputRef={usernameInput}
              label="Username"  
              color="success" 
              variant="outlined" 
            />
            <TextField
              inputRef={emailInput}
              label="E-mail"  
              color="success" 
              variant="outlined" 
              type='email'
            />
            <TextField
              inputRef={passwordInput}
              label="Password"  
              color="success" 
              variant="outlined" 
              type='password'
            />
            <TextField 
              inputRef={confirmPasswordInput}
              label="Confirm-Password"  
              color="success" 
              variant="outlined" 
              type='password'
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
            <Button 
              variant="contained" 
              color="success" 
              size='large' 
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
        </form>
    </div>
  )
}
