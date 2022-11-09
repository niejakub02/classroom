import { NavLink } from "react-router-dom";
import { forwardRef } from "react";
import { useTheme } from "@mui/material";

const CustomNavLink = forwardRef((props, ref) => {
    const theme = useTheme();
    return (
        <NavLink
            style={({isActive}) => ({ color: isActive ? theme.palette.primary.dark : theme.palette.text.primary })}
            {...props}
            ref={ref}
        />
    );
});
 
export default CustomNavLink;