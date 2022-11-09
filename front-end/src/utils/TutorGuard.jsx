import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Page from "../components/Page";
import { userDetailsRequest } from "./API";

const TutorGuard = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isTutor, setIsTutor] = useState(false);

    useEffect(() => {
        userDetailsRequest(id).then(res => {
            const { tutor } = res.data;
            setIsTutor(tutor);
            setIsLoading(true);
        }).catch(err => {

        })
    }, [])

    if (!isLoading) return <Page center><CircularProgress /></Page>

    if (!isTutor) return <Navigate to="/Dashboard" />

    return (
        <Outlet />
    );
}
 
export default TutorGuard;