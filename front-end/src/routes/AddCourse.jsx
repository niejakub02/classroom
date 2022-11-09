import { Box, Typography } from "@mui/material";
import AddCourseForm from "../components/forms/AddCourseForm";
import Page from "../components/Page";

const AddCoursePage = () => {
    return (
        <>
            <Box
                sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pb: "2rem" }}
            >
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                >
                    Adding course
                </Typography>
            </Box>
            <Page>
                <AddCourseForm />
            </Page>
        </>

    );
}

export default AddCoursePage;