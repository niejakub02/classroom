import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { enrollCourseRequest, notEnrolledCoursesRequest } from "../utils/API";
import Page from "../components/Page";
import CoursesFilter from "../components/CoursesFilter";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    const [courses, setCourses] = useState(null);
    const coursesBase = useRef(null);

    useEffect(() => {
        notEnrolledCoursesRequest().then(res => {
            setTimeout(() => {
                const data = res.data.map(course => {
                    return {
                        ...course,
                        creationDateTime: new Date(course.creationDateTime)
                    }
                });

                setCourses(data);
                coursesBase.current = data;;
            }, 500);
        })
    }, []);

    const onEnrollHandler = (e, courseId) => {
        enrollCourseRequest(courseId).then(res => {
            // e.target.parentNode.parentNode.parentNode.remove();
            setCourses(courses.filter(course => course.id !== courseId));
        }).catch(err => {

        });
    }

    if (!courses) return <Page center><CircularProgress /></Page>


    return (
        <>
            <Box sx={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <CoursesFilter
                    courses={courses}
                    coursesBase={coursesBase}
                    setCourses={setCourses}
                />
                <Button variant="outlined" sx={{ height: '3.5rem', fontWeight: 'bolder', fontSize: '1rem', flexGrow: 1, minWidth: { xs: 275, sm: 0 } }} size="large" component={Link} to="/AddCourse">Add course</Button>
            </Box>
            {
                courses.length === 0 ?
                    <Page center>No course meets criteria 😥</Page>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "80vw" }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}
                        >
                            {
                                courses.map(course =>
                                    <CourseCard
                                        course={course}
                                        key={course.title}
                                    >
                                        <Button size="small" onClick={(e) => onEnrollHandler(e, course.id)}>Enroll</Button>
                                    </CourseCard>
                                )
                            }
                        </Box>
                    </Box>
            }

        </>
    );
}

export default DashboardPage;