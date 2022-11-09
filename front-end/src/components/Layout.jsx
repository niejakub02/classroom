import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Page from "./Page";

const Layout = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                minHeight: '100vh',
                gridTemplate: 'minmax(min-content, max-content) auto / auto',
                '& > div': {
                    py: '2rem',
                    boxSizing: 'border-box'
                }
            }}
        >
            <NavBar />
            <Page>
                <Outlet />
            </Page>

        </Box>
    );
}

export default Layout;