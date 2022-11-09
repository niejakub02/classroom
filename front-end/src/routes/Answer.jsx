import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddAnswerForm from "../components/forms/AddAnswerForm";
import Page from "../components/Page";
import { courseRequest, getAnswerRequest, getCourseByTaskRequest } from "../utils/API";

const AnswerPage = () => {
    const { id } = useParams();
    const [answer, setAnswer] = useState(null);
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getCourseByTaskRequest(id), getAnswerRequest(id)]).then(res => {
            const [courseResponse, answerDetailsResponse] = res;
            setTimeout(() => {
                console.log(res);
                const [answerDetails] = answerDetailsResponse.data;
                const {data: courseDetails } = courseResponse;
                setCourse(courseDetails);
                setAnswer(answerDetails);
                console.log(answerDetails);
                setIsLoading(false);
            }, 500);
        }).catch(err => {

        })
    }, []);

    if (isLoading) return <Page center><CircularProgress /></Page>

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
                    Answering task no. {id} in
                </Typography>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight="bolder"
                    textTransform="uppercase"
                    letterSpacing="3px"
                    component={Link}
                    to={`/course/${course.id}`}
                    sx={{ textDecoration: 'none', cursor: 'pointer', '&:hover': { color: 'primary.dark' } }}
                >
                    {course.title}
                </Typography>
            </Box>
            <AddAnswerForm
                answer={answer}
                courseId={course.id}
            />
        </Page>
    );
}

export default AnswerPage;