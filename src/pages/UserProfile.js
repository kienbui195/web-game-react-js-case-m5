import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid} from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState({})

  const getUserInfoAPI = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/user/info',
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: user.email,
        code: user.code,
      }),
    });
    return result;
  };

  useEffect(() => {
    getUserInfoAPI()
      .then((res) => {
        if (res.data.type === 'success') {
          const user = res.data.message;
          setUser(user)
        } else console.log(res.data.message);
      })
      .catch((err) => console.log(err.message));
  });

  return (
      <Grid container>
        <Grid item xs />
        <Grid item xs sx={{marginTop:10}}>
          <h2>Your Profile</h2>
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
                component="img"
                height="350"
                image="https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg"
                alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
                <br />
                Point: {user.point}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs />
      </Grid>

  );
};

export default UserProfile;
