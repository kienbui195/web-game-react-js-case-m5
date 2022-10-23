import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const logoutApi = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/logout',
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: userInfo.email,
        code: userInfo.code,
      }),
    });
    return result;
  };

  const handleClose = (action) => {
    switch (action) {
      case 'Home':
        navigate('/');
        break;
      case 'Profile':
        navigate('/dashboard/profile');
        break;
      case 'Logout':
        if (window.confirm('Are U Sure?')) {
          logoutApi()
            .then((res) => {
              if (res.data.type === 'success') {
                navigate('/login');
              } else if (res.data.type === 'error') {
                console.log(res.data.message);
              }
            })
            .catch((err) => console.log(err.message));
        } else setOpen(null);
        break;
      default:
        setOpen(null)
    }
  };

  const getUserApi = async () => {
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/user/info',
      method: 'POST',
      Headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: localStorage.getItem('email'),
        code: localStorage.getItem('code'),
      }),
    });
    return result;
  };

  useEffect(() => {
    getUserApi()
      .then((res) => {
        setUser({ username: res.data.message.username, email: res.data.message.email });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user ? user.username : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user ? user.username : ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClose(`${option.label}`)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={()=>handleClose('Logout')} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
