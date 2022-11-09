import { TextField } from "@mui/material";
import { debounce } from 'lodash'

const CoursesFilter = ({ setCourses, coursesBase }) => {
    const onChangeHandler = (e) => {
        setCourses(
            coursesBase.current.filter(course => course.title.toLowerCase().includes(e.target.value))
        )
    }

    return (
        <TextField
            type='text'
            name='filter'
            id='courses-filter'
            variant='outlined'
            label='Search courses...'
            onChange={debounce(onChangeHandler, 500)}
            sx={{minWidth: 275, flexGrow: 100 }}
        />
    );
}

export default CoursesFilter;