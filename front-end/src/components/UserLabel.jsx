import { AccountCircle } from "@mui/icons-material";
import { Box, ButtonGroup, Typography } from "@mui/material";

const UserLabel = ({ user, children}) => {
    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center' }}
        >
            <AccountCircle fontSize="large" />
            <Typography
                sx={{ mr: 2, ml: 1 }}
                variant="h5"
                fontWeight="bolder"
            >
                {user.username}
            </Typography>
            {children}
        </Box>
    );
}

export default UserLabel;