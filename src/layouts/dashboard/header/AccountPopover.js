import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Divider, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
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

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const deleteCode = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/logout',
      method: 'POST',
      headers: { 'content-Type': 'Application/json' },
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
          deleteCode()
            .then(() => {
              localStorage.clear();
              navigate('/login');
            })
            .catch((err) => console.log(err.message));
        } else setOpen(null);
        break;
      default:
        setOpen(null);
    }
  };

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
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClose(`${option.label}`)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => handleClose('Logout')} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
