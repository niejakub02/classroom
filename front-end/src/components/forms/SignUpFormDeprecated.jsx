import { Box, Button, FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import { signInRequest, signUpRequest } from '../../utils/API'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

const SignUpForm = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '',
        password: '',
        repeatedPassword: ''
    });
    const [inputErrors, setInputErrors] = useState({
        username: false,
        password: false,
        repeatedPassword: false
    });
    const inputValidation = useCallback(debounce((currentInput) => {
        let overrideInputErrors = { ...inputErrors };
        for (let [key, value] of Object.entries(currentInput)) {
            if (value.length > 0 && value.length < 8) {
                overrideInputErrors = {
                    ...overrideInputErrors,
                    [key]: true
                }
            } else {
                overrideInputErrors = {
                    ...overrideInputErrors,
                    [key]: false
                }
            }
        }
        setInputErrors(overrideInputErrors);
    }, 500), [])

    useEffect(() => {
        console.log(inputErrors)
    }, [inputErrors])

    useEffect(() => {
        inputValidation(input);
    }, [input])

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e);
        if (input.password !== input.repeatedPassword) {
            console.log('passwords dont match');
            return;
        }


        signUpRequest({
            username: input.username,
            password: input.password
        }).then(res => {
            console.log('done');
            navigate('/');
        }).catch(err => {

        });
    }

    return (
        <form
            onSubmit={onSubmitHandler}
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
                        onChange={onChangeHandler}
                        error={inputErrors.username}
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
                        onChange={onChangeHandler}
                        error={inputErrors.password}
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
                        onChange={onChangeHandler}
                        error={inputErrors.repeatedPassword}
                    />
                </Box>

                <Button sx={{ marginTop: 2 }} type="submit" variant="contained" onClick={onSubmitHandler}>
                    Sign up
                </Button>

                <Button variant="text" component={Link} to="/">Sign in</Button>
            </FormControl>
        </form>
    );
}

export default SignUpForm;