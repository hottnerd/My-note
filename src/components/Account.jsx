import React, { useEffect , useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import axios from 'axios';

export default function Account() {

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const username= user.username;
  const admin = user.admin ;
  const baseUrl = import.meta.env.VITE_REACT_API_URL;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = async () => {
      try {
        await axios({
          method: 'post',
          url: `${baseUrl}/user/logout`,
          withCredentials: true
        });
  
      window.location.reload(true);

      } catch (err) {
        console.log(err)
      }
    };

    const handleManageUsers = () => {
      navigate("/users");
    };



    return (
      <>
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{username.slice(0,2)}</Avatar>
            </IconButton>
          </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> 
            {username.length > 10 ?
              `${user.username.slice(0,10)}..`
              :
              user.username
            }
          </MenuItem>
          <Divider />
          {admin && 
          (<MenuItem onClick={handleManageUsers}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Manage Users
          </MenuItem>)}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }