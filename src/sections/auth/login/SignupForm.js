import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from "formik";
import * as yup from "yup";
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------
const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{6,}$/,
    username: /^.{3,}$/
}

const yupObject = yup.object().shape({
    username: yup.string().required('Required'),
    email: yup.string().email().matches(REGEX.email, 'Email address is not valid')
});


export default function SignupForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleOnchange = (e) => {
        handleValidate(e)
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleValidate = (e) => {
        switch (e.target.name) {
            case 'username':
                if (!REGEX.username.test(e.target.value)) {
                    setError({...error, username: 'Username must have at least 3 characters'})
                }else{
                    setError({...error, username: ''})
                }
                break;
            case 'email':
                if (!REGEX.email.test(e.target.value)) {
                    setError({...error, email: 'Email is not valid'})
                }else{
                    setError({...error, email: ''})
                }
                break;
            case 'password':
                if(!REGEX.password.test(e.target.value)){
                    setError({...error, password: 'Password must have at least 6 characters'})
                }else {
                    setError({...error, password: ''})
                }
                break;
            case 'passwordConfirm':
                if(e.target.value !== form.password){
                    setError({...error, passwordConfirm: 'Password is not the same'})
                }else {
                    setError({...error, passwordConfirm: ''})
                }
                break;
            default:
                break;
        }
        console.log(error)
    }

    const handleClick = () => {
        navigate('/dashboard');
    };

    const handleSubmit = () => {
        console.log(1)
    }

    return (
        <>
            <Stack spacing={3}>
                {!error.username
                    ? <TextField required
                                 name="username"
                                 label="Username"
                                 onChange={e => handleOnchange(e)}
                    />
                    : <TextField required
                                 name="username"
                                 label="Username"
                                 onChange={e => handleOnchange(e)}
                                 error
                                 helperText={error.username}
                    />
                }

                {!error.email
                ?<TextField required type="email" name="email" label="Email address" onChange={e => {handleOnchange(e)}}/>
                :<TextField error helperText={error.email} required type="email" name="email" label="Email address" onChange={e => {handleOnchange(e)}}/>
                }

                {!error.password
                ?<TextField
                        required
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => {
                            handleOnchange(e)
                        }}
                    />
                : <TextField
                        error
                        helperText={error.password}
                        required
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => {
                            handleOnchange(e)
                        }}
                    />
                }

                {!error.passwordConfirm
                    ?<TextField
                        required
                        name="passwordConfirm"
                        label="Confirm password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => {
                            handleOnchange(e)
                        }}
                    />
                    : <TextField
                        error
                        helperText={error.passwordConfirm}
                        required
                        name="passwordConfirm"
                        label="Confirm password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => {
                            handleOnchange(e)
                        }}
                    />

                }

            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <hr/>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Sign up
            </LoadingButton>

        </>
    );
}
