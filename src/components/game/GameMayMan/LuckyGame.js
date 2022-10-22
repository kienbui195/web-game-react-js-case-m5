/* eslint-disable react/self-closing-comp */

import { Button, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const random = ['-5', '2', '5', '10', '15', '20'];

const LuckyGame = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState({
    email: '',
    point: '',
    code: '',
  });
  const [status, setStatus] = useState({
    click: 'block',
    next: 'none',
  });
  const [num, setNum] = useState('');

  const userInfoApi = async () => {
    const result = await axios.request({
      url: ' https://webgame395group.herokuapp.com/api/user/info',
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: localStorage.getItem('email'),
        code: localStorage.getItem('code'),
      }),
    });
    return result;
  };

  const setPointApi = async () => {
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/setpoint',
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      data: JSON.stringify({
        email: value.email,
        code: value.code,
        point: value.point,
      }),
    });
    return result;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = async () => {
    
  };

  const handleNext = () => {
    
  }

  useEffect(() => {
    userInfoApi()
      .then((res) => {
        if (res.data.type === 'success') {
          setValue({
            point: res.data.message.point,
            email: res.data.message.email,
            code: res.data.message.code,
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs />
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{ boxShadow: '5px 5px 5px 5px #5F5F5F', padding: 2, marginLeft: 2, textAlign: 'center' }}
          >
            <h1>
              <span style={{ color: 'yellow' }}>Lucky</span> <span style={{ color: 'red' }}>Game</span>
            </h1>
            <h5>Your Point: {value.point || 0}</h5>
            {status.click === 'block' ? (
              <Button variant="outlined" color="info" onClick={handleClick}>
                Cược 10 Point
              </Button>
            ) : (
              <Button variant="outlined" color="info" onClick={handleClick} disabled>
                Cược 10 Point
              </Button>
            )}

            <h2>{num}</h2>
            {status.click === 'block' ? (
              <Button variant="outlined" color="info" onClick={handleNext} disabled>
                Chơi tiếp...
              </Button>
            ) : (
              <Button variant="outlined" color="info" onClick={handleNext}>
                Chơi tiếp...
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    </div>
  );
};

export default LuckyGame;
