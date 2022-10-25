import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Paper } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';



// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [status, setStatus] = useState({
    button: 'block',
    link: 'none',
  });
  const [user, setUser] = useState({})

  const isDesktop = useResponsive('up', 'lg');

  const callApi = async () => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
      const data = {
        email: userLocal.email,
        code: userLocal.code
      }

      const results = await axios.request({
        url: "https://webgame395group.herokuapp.com/api/user/info",
        method: "POST",
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return results
  }

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      axios.request({
        url: 'https://webgame395group.herokuapp.com/api/clearUser',
        method: "POST",
        data: JSON.stringify(user.email),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => console.log(r)).catch(err => console.log(err));
      callApi()
          .then(res=>
              setUser(res.data.message)
          )
          .catch(err=>console.log(err))
    }else {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user.username}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Point: {user.point}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              You want to give us feedback?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Any of your comments are like a treasure to us...
            </Typography>
          </Box>

          <Button
            onClick={() => {
              setStatus({ button: 'none', link: 'block' });
            }}
            target="_blank"
            variant="contained"
            sx={{ display: status.button}}
          >
            Feedback
          </Button>
          <Paper elevation={3} sx={{ display: status.link }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: status.link }}>
              Send some email to: tktclothershopc0522i1@gmail.com
            </Typography>
            <Button onClick={()=>setStatus({button: 'block', link: 'none'})}>Back</Button>
          </Paper>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
