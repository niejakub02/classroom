import { Alert, Box, Button, FormControl, Snackbar } from '@mui/material'
import { TextField } from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import { signInRequest, signUpRequest } from '../../utils/API'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'

const SignUpForm = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, clearErrors, setError } = useForm();

    const onSubmitHandler = (data) => {
        if (data.password !== data.repeatedPassword) {
            setError('password', {
                type: 'PASSWORD_MATCH',
                message: 'Password dont match up'
            })
            return;
        }

        signUpRequest({
            username: data.username,
            password: data.password
        }).then(res => {
            console.log('done');
            navigate('/');
        }).catch(err => {
            console.log(err);
            if (err.response.status === 403) { // handled errors
                const { response: { data: code } } = err;
                switch (code) {
                    case 'USERNAME_LENGTH':
                        console.log('here')
                        setError('username', {
                            type: code,
                            message: 'Username has too few characters'
                        });
                        break;

                    case 'PASSWORD_LENGTH':
                        setError('password', {
                            type: code,
                            message: 'Password has too few characters'
                        })
                        break;

                    case 'USERNAME_TAKEN':
                        setError('username', {
                            type: code,
                            message: 'Username already taken'
                        });
                        break;
                }
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <FormControl
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
                        required
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
                        required
                        {...register("password", { required: true })}
                        error={!!errors.password}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Lock sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                        type='password'
                        name='repeatedPassword'
                        id='repeatedPassword'
                        variant='standard'
                        label='Repeat password'
                        required
                        {...register("repeatedPassword", { required: true })}
                        error={!!errors.password}
                    />
                </Box>

                <Button sx={{ marginTop: 2 }} type="submit" variant="contained" onClick={handleSubmit(onSubmitHandler)}>
                    Sign up
                </Button>

                <Button variant="text" component={Link} to="/">Sign in</Button>

                <Snackbar
                    open={!!errors.username || !!errors.password}
                    autoHideDuration={3000}
                    onClose={() => { clearErrors(['username', 'password', 'repeatedPassword']); }}
                >
                    <Alert
                        severity="error"
                    >
                        {(errors.username?.type === 'required' || errors.password?.type === 'required') && 'Username/password must not be empty'}
                        {!!errors.username && errors.username?.message}
                        {!!errors.password && errors.password?.message}
                    </Alert>
                </Snackbar>
            </FormControl>
        </form>
    );
}

export default SignUpForm;