import { Box } from "@mui/material";
import Page from "./Page";

const TabPanel = ({ index, value, children }) => {
    return (
        <Box
            sx={{ height: '100%', display: index === value ? 'flex' : 'none'}}
        >
            {children}
        </Box>
    );
}
 
export default TabPanel;