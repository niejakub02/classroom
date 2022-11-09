import { Box, Typography } from "@mui/material";
import { Class as ClassIcon } from "@mui/icons-material";

const LogoHome = () => {
    return (
        <Box sx={{ display: 'flex', color: 'text.secondary' }}>
            <ClassIcon sx={{ mr: 1 }} fontSize="large" />
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    mt: '3px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                }}
            >
                CLASSROOM
            </Typography>
        </Box>
    );
}

export default LogoHome;