/* eslint-disable no-plusplus */
import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';
import axios from "axios";
// @mui
import {
    Box, CircularProgress,
    Container, Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

// components

// ----------------------------------------------------------------------

export default function LeaderBoard() {
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        axios.get('https://webgame395group.herokuapp.com/api/getAllUser')
            .then((res) => {
                const data = JSON.parse(res.data.data);
                const myarray = []
                for (let i = 0; i < data.length; i++) {
                    myarray.push(data[i]);
                }
                const results = myarray.sort(({point: a}, {point: b}) => b - a);
                setLeaderboard(results)
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Helmet>
                <title> LeaderBoard </title>
            </Helmet>

            <Container>
                <h1>LeaderBoard</h1>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ranking</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Point</TableCell>
                            </TableRow>
                        </TableHead>
                        {loading
                        ? <CircularProgress />
                        :(<TableBody>
                                {leaderboard.map((row,index) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">{row.username}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.point}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>)}
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}
