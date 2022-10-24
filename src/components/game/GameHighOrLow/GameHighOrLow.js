/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { useDispatch, useSelector } from 'react-redux';
import { getValue } from '../../../features/gameSuggestSlice';

const randomNum = () => Math.floor(Math.random() * 11);

const GameHighOrLow = () => {
  const mid = 5;
  const navigate = useNavigate();
  const [second, setSecond] = useState();
  const [point, setPoint] = useState(0);
  const dispatch = useDispatch();
  const [mess, setMess] = useState('');
  const userSelect = useSelector((state) => state.dataGame.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.data.value) {
      setMess('Bạn cần lựa chọn trước khi đoán!');
    } else {
      dispatch(getValue(e.target.data.value));
      setSecond(randomNum());
    }
  };

  const userInfo = JSON.parse(localStorage.getItem('user'))

  const updatePoint = async () => {
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/setpoint',
      method: 'POST',
      headers: {  "Content-Type": "application/json"  },
      data: JSON.stringify({
        email: `${userInfo.email}`,
        code: `${userInfo.code}`,
        point: `${point}`
      }),
    });

    return result;
  };

  const handleExit = () => {
    updatePoint()
      .then((res) => {
        if (res.data.type === 'success') {
          navigate('/dashboard');
        } else {
          setMess('Bạn cần phải login để lưu được điểm số!');
          setTimeout(() => navigate('/login'), 2000);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    if (second) {
      if (second >= mid) {
        if (userSelect === 1) {
          setMess('Bạn đã trả lời đúng!')
          setPoint(point + 10);
        } else {
          setMess('Bạn đã trả lời sai!')
          setPoint(point - 5);
        }
      } else if (second < mid) {
        if (userSelect === 1) {
          setMess('Bạn đã trả lời sai!')
          setPoint(point - 5);
        } else {
          setMess('Bạn đã trả lời đúng!')
          setPoint(point + 10);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [second]);

  return (
    <div>
      <Grid sx={{}}>
        <Grid item xs />
        <Grid item xs={8} sx={{ textAlign: 'center' }}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              marginTop: 3,
              textAlign: 'center',
              maxWidth: 370,
              marginLeft: 26,
              boxShadow: '5px 5px 5px 5px',
            }}
          >
            {mess ? <Alert severity="warning">{mess}</Alert> : ''}
            <h2>
              <span style={{ color: 'red' }}>Cao Hơn</span> Hay <span style={{ color: 'green' }}>Thấp Hơn</span> Số 5 ??
            </h2>
            <p style={{ color: 'blue' }}>Điểm của bạn: {point || 0}</p>

            <Box component="form" onSubmit={handleSubmit}>
              <div>
                <label>
                  <input type="radio" value={1} name="data" />
                  Cao hơn
                </label>
                <label>
                  <input type="radio" value={-1} name="data" />
                  Thấp hơn
                </label>
              </div>

              <Button type="submit" variant="contained" color="success" sx={{ marginTop: 3, minWidth: 98 }}>
                Đoán
              </Button>
            </Box>
            <Button type="button" onClick={handleExit} variant="outlined" sx={{ marginTop: 1, minWidth: 90 }}>
              Lưu điểm
            </Button>
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    </div>
  );
};

export default GameHighOrLow;
