import { Box, StepLabel, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "../components/forms/signInForm";
import { useContext, useEffect } from "react";
import Page from "../components/Page";
import LogoHome from "../components/LogoHome";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <Page center>
            <LogoHome />
            <SignInForm />
        </Page>
    );
}

export default HomePage;