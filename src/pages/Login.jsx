import React, { useEffect, useRef, useState } from 'react';
import styles from "../styles/Login.module.css";
import { Button , TextField, InputAdornment, IconButton, Tooltip} from '@mui/material';
import picture1 from "../assets/picture1.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData} from '../redux/userSlice';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from 'axios';



export default function Login() {
  
  const dispatch = useDispatch();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [credentials,setCredentials] = useState({username:"",password:""});
  const [error,setError] = useState(false);
  const [usernameError,setusernameError] = useState({status:false,message:null});
  const [passwordError,setpasswordError] = useState({status:false,message:null});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onClickHandle = async (e) => {
    
    e.preventDefault()

    if ((credentials.username === "") && (credentials.password === "")) {
      setusernameError({status:true,message:"Username Required"});
      setpasswordError({status:true,message:"Password Required"});
      return;
    }else if (credentials.username === "") {
      usernameInput.current.focus();
      setusernameError({status:true,message:"Username Required"});
      
      return;
    }else if (credentials.password === "") {
      passwordInput.current.focus();
      setpasswordError({status:true,message:"Password Required"});
      return;
    }

    const baseUrl = import.meta.env.VITE_REACT_API_URL;

    try {
      await axios({
        method: 'post',
        url: `${baseUrl}/user/login`,
        data: credentials,
        withCredentials: true
      });

      dispatch(getUserData());

      navigate("/");

    } catch(err) {
      setusernameError({status:true,message:null});
      setpasswordError({status:true,message:null});
      setError(true);
      setCredentials({username:"",password:""});
    }
  };

  const handleUsername = (e) => {
    setCredentials((prev)=>{
      return {...prev, username : e.target.value};
    })
    setusernameError({status:false,message:null});
  };

  const handlePassword = (e) => {
    setCredentials((prev)=>{
      return {...prev, password : e.target.value};
    })
    setpasswordError({status:false,message:null});
  };
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src={picture1} alt='background image'/>
        </div>
        <div className={styles.textContainer}>    
            <form>
                <h1>My Note</h1>
                <TextField 
                  inputRef={usernameInput} 
                  helperText={usernameError.message} 
                  error={usernameError.status} 
                  onChange={handleUsername} 
                  value={credentials.username}  
                  label="Username"  
                  color="success" 
                  variant="outlined" 
                />
                <TextField 
                  inputRef={passwordInput} 
                  helperText={passwordError.message} 
                  error={passwordError.status} 
                  onChange={handlePassword} 
                  value={credentials.password}  
                  label="Password"  
                  color="success" 
                  variant="outlined" 
                  type={showPassword ? "text" : "password"}
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={showPassword ? "show" : "hide"}>
                          <IconButton
                            aria-label={"toggle password visibility"}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </Tooltip>  
                      </InputAdornment>
                    )
                  }}
                />
                <div className={styles.buttonContainer}>
                  {error && <div>* Invalid Credentials</div>}
                  <Button 
                    onClick={onClickHandle} 
                    variant="contained" 
                    color="success" 
                    size='large' 
                    fullWidth>
                      Log In
                  </Button>  
                </div>               
                <div>Don't have an account? <Link className={styles.signUp} to="/register">Sign Up</Link></div>
            </form>
        </div>
    </div>
  )
};
