import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { verifyRequest } from "./API";

const ProtectedRoute = () => {
    const [auth, setAuth] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        verifyRequest().then(res => {
            console.log('byl request')
            // setTimeout(() => {
            //     if (!auth) setAuth(true);
            // }, 500);
            if (!auth) setAuth(true);
        }).catch(err => {
            if (auth) setAuth(false);
            localStorage.removeItem("access_token");
            navigate("/");
        })
    }, [location.pathname]);

    if (!auth) return <Page center><CircularProgress /></Page>

    return <Outlet />
}
 
export default ProtectedRoute;