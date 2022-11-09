import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseRequest } from "../../utils/API";

const AddCourseForm = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        summary: '',
    });

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addCourseRequest(input).then(res => {
            console.log('course added');
            navigate(`/course/${res.data.id}`);
        }).catch(err => {

        });
    }

    return (
        <form style={{ width: '25%', minWidth: 275 }} onSubmit={onSubmitHandler}>
            <FormControl sx={{ display: 'flex', gap: '1rem' }}>
                <TextField
                    name='title'
                    id='title'
                    variant='outlined'
                    label='Title'
                    type='text'
                    required
                    onChange={onChangeHandler}
                    // error={usernameError}
                    autoFocus
                />

                <TextField
                    type='text'
                    name='about'
                    id='about'
                    variant='outlined'
                    label='About'
                    multiline
                    rows={3}
                    required
                    onChange={onChangeHandler}
                />

                <Button type="submit" variant="contained" size="large" onClick={onSubmitHandler}>
                    Add course
                </Button>

            </FormControl>
        </form>
    );
}

export default AddCourseForm;