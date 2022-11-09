import { Box, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addTaskRequest } from "../../utils/API";
import { useNavigate } from "react-router-dom";



const AddTaskForm = ({ courseId }) => {
    const { register, formState: { errors }, handleSubmit, clearErrors, setError } = useForm();
    const [startDate, setStartDate] = useState(dayjs(Date.now()));
    const [endDate, setEndDate] = useState(dayjs(Date.now() + 1000 * 60 * 60 * 24 * 7));
    const navigate = useNavigate();

    const startDateChange = (newValue) => {
        setStartDate(newValue);
    };

    const endDateChange = (newValue) => {
        setEndDate(newValue);
    };

    const onSubmitHandler = (data) => {
        const dataFormat = {
            ...data,
            startsAt: dayjs(startDate + 1000 * 60 * 60).toISOString(),
            endsAt: dayjs(endDate + 1000 * 60 * 60).toISOString()
        }
        console.log(dataFormat);
        addTaskRequest(courseId, dataFormat).then(res => {

            navigate(`/course/${courseId}`);
        }).catch(err => {

        });
    }

    return (
        <form style={{ width: '25%', minWidth: 275 }} onSubmit={handleSubmit(onSubmitHandler)}>
            <Box
                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 4 }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TextField
                        name='title'
                        id='title'
                        variant='outlined'
                        label='Title'
                        type='text'
                        {...register("title", { required: true })}
                        sx={{ width: '100%' }}
                        error={!!errors.title}
                        autoFocus
                    />

                    <DateTimePicker
                        label="Task start date"
                        value={startDate}
                        onChange={startDateChange}
                        renderInput={(params) => <TextField
                            {...params}
                            sx={{ width: '100%' }}
                        />}
                    />

                    <DateTimePicker
                        label="Task end date"
                        value={endDate}
                        onChange={endDateChange}
                        renderInput={(params) => <TextField
                            {...params}
                            sx={{ width: '100%' }}
                        />}
                    />

                    <TextField
                        name='content'
                        id='content'
                        variant='outlined'
                        label='Content'
                        type='text'
                        {...register("content", { required: true })}
                        sx={{ width: '100%' }}
                        error={!!errors.content}
                        rows={6}
                        multiline
                    />

                    <Button sx={{ width: '100%' }} type="submit" variant="contained" size="large" onClick={handleSubmit(onSubmitHandler)}>
                        Add task
                    </Button>
                </LocalizationProvider>
            </Box>
        </form>
    );
}

export default AddTaskForm;