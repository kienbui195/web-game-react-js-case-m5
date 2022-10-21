/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState , useEffect } from 'react';
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
	const [result, setResult] = useState(0);
	const dispatch = useDispatch();
	const userSelect = useSelector(state => state.dataGame.value);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(getValue(e.target.data.value));
		setSecond(randomNum());
	};

	const updatePoint = async () => {
		const result =  await axios.request({
			url: 'https://webgame395group.herokuapp.com/api/setpoint',
			method: 'POST',
			Headers: { 'Content-Type': 'Application/json' },
			data: JSON.stringify({
				email: 'ken@gmail.com',
				code: '',
			}),
        });
        
        return result
	};

	const handleExit = () => {
		updatePoint()
			.then(res => {
				if (res.data.type === 'success') {
					navigate('/home');
				} else {
					navigate('/login');
				}
			})
			.catch(err => console.log(err.message));
	};

	useEffect(() => {
		console.log(userSelect);
		if (second) {
			if (second > mid) {
				if (userSelect === 1) {
					setResult(result + 2);
				} else {
					setResult(result - 1);
				}
			} else if (userSelect === 1) {
					setResult(result - 1);
				} else {
					setResult(result + 2);
				}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [second]);

	return (
		<div>
			<Grid>
				<Grid item xs />
				<Grid item xs={8} sx={{ textAlign: 'center' }}>
					<Paper elevation={3} sx={{ padding: 2, marginTop: 10, textAlign: 'center', maxWidth: 300 }}>
						<h2> Higher Or Lower Game???</h2>
						<p>Your Point: {result || 0}</p>

						<Box component='form' onSubmit={handleSubmit}>
							<TextField
								value={second || 5}
								disabled
								type='number'
								inputProps={{ style: { textAlign: 'center' } }}
							/>
							<div>
								<input type='radio' value={1} name='data' />
								Higher
								<input type='radio' value={-1} name='data' />
								Lower
							</div>

							<Button type='submit' variant='contained' color='success' sx={{ marginTop: 3 }}>
								submit
							</Button>
						</Box>
						<Button type='button' onClick={handleExit} variant='outlined' sx={{ marginTop: 1 }}>
							Other Game...
						</Button>
					</Paper>
				</Grid>
				<Grid item xs/>
			</Grid>
		</div>
	);
};

export default GameHighOrLow;
