import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import TabPanel from '../components/TabPanel';
import Page from '../components/Page';
import { useParams } from 'react-router-dom';
import { courseRequest, userDetailsRequest } from '../utils/API';
import { CircularProgress } from '@mui/material';
import PendingUsersTab from '../components/PendingUsers';
import EnrolledUsersTab from '../components/EnrolledUsers';
import TasksTab from '../components/TasksTab';


const CoursePage = () => {
    const [value, setValue] = useState(0);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        Promise.all([courseRequest(id), userDetailsRequest(id)]).then(res => {
            const [courseResponse, userDetailsResponse] = res;
            setTimeout(() => {
                const [courseDetails] = courseResponse.data;
                setCourse({
                    ...courseDetails,
                    creationDateTime: new Date(courseDetails.creationDateTime),
                    tasks: ((courseDetails.tasks.map(task => ({
                        ...task,
                        startsAt: new Date(task.startsAt),
                        endsAt: new Date(task.endsAt)
                    }))).sort((a, b) => {
                        if (b.endsAt > Date.now()) return -1;

                        return a.endsAt - b.endsAt
                    })).reverse()
                });

                setUserDetails(userDetailsResponse.data);
            }, 500);
        }).catch(err => {

        });
    }, [])

    useEffect(() => {
        console.log(course);
    }, [course]);

    if (!course) return <Page center><CircularProgress /></Page>

    return (
        <>
            <Typography
                variant="h5"
                color="primary"
                fontWeight="bolder"
                textTransform="uppercase"
                letterSpacing="3px"
            >
                {course.title}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center', position: 'sticky' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tasks" />
                    <Tab label="Students" />
                    <Tab label="Pending" />
                </Tabs>
            </Box>
            <Box sx={{ flex: 1 }}>
                <TabPanel value={value} index={0}>
                    <TasksTab
                        tasks={course.tasks}
                        isTutor={userDetails.tutor}
                        userId={userDetails.id}
                        courseId={id}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EnrolledUsersTab
                        users={course.enrolledUsers}
                        isTutor={userDetails.tutor}
                        userId={userDetails.id}
                        courseId={id}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PendingUsersTab
                        users={course.pendingUsers}
                        isTutor={userDetails.tutor}
                        courseId={id}
                    />
                </TabPanel>
            </Box>
        </>
    );
}

export default CoursePage;