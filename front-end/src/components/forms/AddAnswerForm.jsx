import { Button, FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import { useEffect } from 'react'
import { deleteAnswerRequest, editAnswerRequest, signUpRequest } from '../../utils/API'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const AddAnswerForm = ({ answer, courseId }) => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, clearErrors, setError, setValue } = useForm();

    useEffect(() => {
        setValue('content', answer.content)
    }, []);

    const onSubmitHandler = (data) => {
        editAnswerRequest(answer.id, data).then(res => {
            navigate(`/course/${courseId}`);
        }).catch(err => {

        })
    }

    const onRemoveHandler = () => {
        deleteAnswerRequest(answer.id).then(res => {
            navigate(`/course/${courseId}`);
        }).catch(err => {

        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ width: '25%', minWidth: 275 }}
        >
            <FormControl
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}
            >
                <TextField
                    name='content'
                    id='content'
                    variant='outlined'
                    label='Content'
                    type='text'
                    {...register("content", { required: true })}
                    sx={{ width: '100%' }}
                    error={!!errors.content}
                    multiline
                    rows={10}
                    autoFocus
                />

                <Button sx={{ marginTop: 2, width: '100%' }} type="submit" variant="contained" onClick={handleSubmit(onSubmitHandler)}>
                    Submit answer
                </Button>

                <Button sx={{ width: '100%' }} type="submit" variant="outlined" color="error" onClick={onRemoveHandler}>
                    Remove answer
                </Button>

            </FormControl>
        </form>
    );
}

export default AddAnswerForm;