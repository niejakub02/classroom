import Page from "../components/Page";
import AddTaskForm from "../components/forms/AddTaskForm";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { courseRequest } from "../utils/API";
import { Box, CircularProgress, Typography } from "@mui/material";

const AddTaskPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        courseRequest(id).then(res => {
            setTimeout(() => {
                const [courseDetails] = res.data;
                setCourse(courseDetails);
                setIsLoading(false)
            }, 500);
        }).catch(err => {

        });
    }, [])

    if (isLoading) return <Page center><CircularProgress /></Page>

    if (!course) return <Navigate to="/dashboard" />

    return (
        <Page>
            <Box
                sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pb: "2rem" }}
            >
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                >
                    Adding task for
                </Typography>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight="bolder"
                    textTransform="uppercase"
                    letterSpacing="3px"
                    component={Link}
                    to={`/course/${id}`}
                    sx={{ textDecoration: 'none', cursor: 'pointer', '&:hover': { color: 'primary.dark' } }}
                >
                    {course.title}
                </Typography>
            </Box>
            <Page>
                <AddTaskForm
                    courseId={id}
                />
            </Page>
        </Page>
    );
}

export default AddTaskPage;