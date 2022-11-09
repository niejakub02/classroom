import { Box, Button } from '@mui/material'
import { TextField } from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { signInRequest } from '../../utils/API'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignInForm = () => {
    const { register, formState: { errors }, handleSubmit, clearErrors, setError } = useForm();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    // const [usernameError, setUsernameError] = useState(false);

    const onChangeHandler = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = () => {
        signInRequest(credentials).then(res => {
            console.log(res.data.access_token)
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/dashboard")
        }).catch(err => {

        })
    }

    return (
        <form
            onSubmit={onSubmitHandler}
        >
            <Box
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                        name='username'
                        id='username'
                        variant='standard'
                        label='Username'
                        type='text'
                        // required={true}
                        onChange={onChangeHandler}
                        // error={usernameError}
                        autoFocus
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Lock sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                        type='password'
                        name='password'
                        id='password'
                        variant='standard'
                        label='Password'
                        // required
                        onChange={onChangeHandler}
                    />
                </Box>

                <Button sx={{ marginTop: 2 }} type="submit" variant="contained" onClick={handleSubmit(onSubmitHandler)}>
                    Sign in
                </Button>

                <Button variant="text" component={Link} to="/signUp">Sign up</Button>
            </Box>
        </form>
    );
}

export default SignInForm;