import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
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
    }

    const callApi = async () => {
        const data = {
            username: form.username,
            email: form.email,
            password: form.password
        }

        const results = await axios.request({
            url: "https://webgame395group.herokuapp.com/api/register",
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return results
    }

    const handleApi = (data) =>{
        if(data.type === 'success'){
            Swal.fire(
                'Register success',
                'Welcome to 395 World!',
                'success'
            ).then(
                navigate('/login')
            )
        }else {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Account already exists!',
                footer: '<a href="/login">Go to Login</a>'
            })
        }
    }

    const handleSubmit = () => {
        if(form.username===''||form.password===''||form.passwordConfirm===''||form.email==='') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all the required fields'
            })
        }else{
            callApi().
            then(res => handleApi(res.data)).
            catch(err => console.log(err.message))
        }
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
            {(!error.email && !error.username && !error.password && !error.passwordConfirm)
            ?<LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
                    Sign up
                </LoadingButton>
            :<LoadingButton disabled fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
                    Sign up
                </LoadingButton>
            }


        </>
    );
}
