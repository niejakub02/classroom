import { Box } from "@mui/material";

const Page = ({ children, center, ...props }) => {
    return (
        <Box
            sx={{ 
                display: 'flex', 
                justifyContent: center ? 'center' : 'flex-start',
                alignItems: 'center', 
                flexDirection: 'column', 
                minWidth: '100vw',
                height: '100%',
                gap: '2rem',
                backgroundColor: 'background.default'
                }}
            {...props}
        >
            {children}
        </Box>
    );
}
 
export default Page;