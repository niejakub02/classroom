import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/forms/SignUpForm";
import LogoHome from "../components/LogoHome";
import Page from "../components/Page";

const SignUpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <Page center>
            <LogoHome />
            <SignUpForm />
        </Page>
    );
}
 
export default SignUpPage;