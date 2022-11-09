import { Error as ErrorIcon } from "@mui/icons-material";
import { Box, StepLabel } from "@mui/material";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ErrorIcon />
            <StepLabel>Error</StepLabel>
            {
                !!error.message &&
                <p>{error.message}</p>
            }
        </Box>
    );
}

export default ErrorPage;