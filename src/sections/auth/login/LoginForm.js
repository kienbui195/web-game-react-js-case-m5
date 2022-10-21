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
}

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const handleValidate = (e) => {
        switch (e.target.name) {
            case 'email':
                if (!REGEX.email.test(e.target.value)) {
                    setError({...error, email: 'Email is not valid'})
                } else {
                    setError({...error, email: ''})
                }
                break;
            case 'password':
                if (!REGEX.password.test(e.target.value)) {
                    setError({...error, password: 'Password must have at least 6 characters'})
                } else {
                    setError({...error, password: ''})
                }
                break;
            default:
                break;
        }
    }

    const handleOnchange = (e) => {
        handleValidate(e)
        setForm({...form, [e.target.name]: e.target.value});
    }

    const callApi = async () => {
        const data = {
            email: form.email,
            password: form.password
        }
        console.log(data)

        const results = await axios.request({
            url: "https://webgame395group.herokuapp.com/api/login",
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return results
    }

    const handleApi = (data) =>{
        console.log(data)
    }

    const handleClick = () => {
        callApi().
        then(res => handleApi(res.data)).
        catch(err => console.log(err.message))
    };

    return (
        <>
            <Stack spacing={3}>
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
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <Checkbox name="remember" label="Remember me"/>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            {(!error.email && !error.password)
            ?<LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                    Login
                </LoadingButton>
            :<LoadingButton disabled fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                    Login
                </LoadingButton>
            }

        </>
    );
}
