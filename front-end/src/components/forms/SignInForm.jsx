import { Alert, Box, Button, FormControl, Snackbar } from '@mui/material'
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

    const onSubmitHandler = (data) => {
        console.log(data);
        signInRequest(data).then(res => {
            console.log(res.data.access_token)
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/dashboard")
        }).catch(err => {
            if (err.response.status === 403) { // handled errors
                // setError('username', {
                //     type: 'credentials',
                //     message: 'Invalid credentials'
                // })
                // setError('password', {
                //     type: 'credentials',
                //     message: 'Invalid credentials'
                // })
                ['username', 'password'].forEach(input => setError(input, {
                    type: 'credentials',
                    message: 'Invalid credentials'
                }))
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
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
                        // error={usernameError}
                        {...register("username", { required: true })}
                        error={!!errors.username}
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
                        {...register("password", { required: true })}
                        error={!!errors.password}
                    />
                </Box>

                <Button sx={{ marginTop: 2 }} type="submit" variant="contained" onClick={handleSubmit(onSubmitHandler)}>
                    Sign in
                </Button>

                <Button variant="text" component={Link} to="/signUp">Sign up</Button>

                <Snackbar
                    open={!!errors.username || !!errors.password}
                    autoHideDuration={3000}
                    onClose={() => { clearErrors(['username', 'password']); }}
                >
                    <Alert
                        severity="error"
                    >
                        {(errors.username?.type === 'required' || errors.password?.type === 'required') && 'Username/password must not be empty'}
                        {(errors.username?.type === 'credentials' || errors.password?.type === 'credentials') && 'Invalid credentials'}
                    </Alert>
                </Snackbar>

            </Box>
        </form>
    );
}

export default SignInForm;