import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [status, setStatus] = useState(false);

  const getUserInfoAPI = async () => {
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/user/info',
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: localStorage.getItem('email'),
        code: localStorage.getItem('code'),
      }),
    });
    return result;
  };

  useEffect(() => {
    getUserInfoAPI()
      .then((res) => {
        if (res.data.type === 'success') {
          const user = res.data.message;
          setUserInfo({
            email: user.email,
            username: user.username,
            password: user.password,
          });
        } else console.log(res.data.message);
      })
      .catch((err) => console.log(err.message));
  });

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs />
        <Grid item xs>
          <Paper elevation={2} xs={{ padding: 2 }}>
                      <h2>Hello {userInfo.username}</h2>
                      <TextField    />
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    </div>
  );
};

export default UserProfile;
