import { Box, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { enrolledCoursesRequest, leaveCourseRequest } from "../utils/API";
import Page from "../components/Page";
import CoursesFilter from "../components/CoursesFilter";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const EnrolledPage = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const coursesBase = useRef(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const courseId = useRef(null);

    useEffect(() => {
        enrolledCoursesRequest().then(res => {
            console.log(res);
            const data = res.data.map(course => {
                return {
                    ...course,
                    creationDateTime: new Date(course.creationDateTime)
                }
            });

            setCourses(data);
            coursesBase.current = data;
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }, []);

    const handleClickOpen = (e, id) => {
        courseId.current = id;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        courseId.current = null;
    };

    const onLeaveHandler = () => {
        leaveCourseRequest(courseId.current).then(res => {
            console.log('done');
            setCourses(courses.filter(course => course.id !== courseId.current));
        }).catch(err => {

        }).finally(() => {
            setOpen(false);
            courseId.current = null;
        })
    }

    // const onLeaveHandler = (e, courseId) => {
    //     leaveCourseRequest(courseId).then(res => {
    //         console.log('done');
    //         e.target.parentNode.parentNode.parentNode.remove();
    //     }).catch(err => {

    //     });
    // }

    if (loading) return <Page center><CircularProgress /></Page>

    return (
        <>
            <Box sx={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <CoursesFilter
                    courses={courses}
                    coursesBase={coursesBase}
                    setCourses={setCourses}
                />
            </Box>

            {
                courses.length === 0 ?
                    <Page center>No course meets criteria 😥</Page>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "80vw" }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: "2rem" }}
                        >
                            {
                                courses.map(course =>
                                    <CourseCard
                                        course={course}
                                        key={course.title}
                                    >
                                        <Button size="small" color="warning" onClick={(e) => handleClickOpen(e, course.id)}>Leave</Button>
                                        <Button size="small" component={Link} to={`/course/${course.id}`}>Open</Button>
                                    </CourseCard>
                                )
                            }
                        </Box>
                    </Box>
            }

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Leave the course?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to leave the course.
                        Are you sure about that?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onLeaveHandler}>
                        Yes
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EnrolledPage;