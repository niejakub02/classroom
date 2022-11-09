import { Box, CardActions, CardContent, Typography, Card } from "@mui/material";

const CourseCard = ({ course, children }) => {
    const { title, creationDateTime, about, tutor: { username } } = course
    return (
        <Box sx={{ width: 275 }}>
            <Card variant="outlined" sx={{
                backgroundColor: 'background.default',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.09), rgba(0, 0, 0, 0.09))'
            }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {username}
                    </Typography>
                    <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="h5" component="div" color="primary.dark">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5  }} color="text.secondary">
                        {creationDateTime.toLocaleString()}
                    </Typography>
                    <Typography sx={{ height: '2.5rem', overflow: 'hidden' }} variant="body2">
                        {about}
                    </Typography>
                </CardContent>
                <CardActions>
                    {children}
                </CardActions>
            </Card>
        </Box>
    );
}

export default CourseCard;