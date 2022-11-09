import { createTheme } from "@mui/material";

// const palette = {
//     type: "dark",
//     primary: {
//         light: 'rgb(255, 0, 0)',
//         main: 'rgb(150, 0, 0)',
//         dark: 'rgb(75, 0, 0)',
//         contrastText: 'rgb(255, 255, 255)',
//     },
//     secondary: {
//         light: 'rgb(255, 255, 255)',
//         main: 'rgb(255, 255, 255)',
//         dark: 'rgb(255, 255, 255)',
//         contrastText: 'rgb(255, 255, 255)',
//     },
// };

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'rgb(32, 38, 48)'
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Arial'
        ].join(',')
    }
});

export default theme;