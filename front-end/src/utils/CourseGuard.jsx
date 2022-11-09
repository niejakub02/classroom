import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Page from "../components/Page";
import { isEnrolledRequest } from "./API";

const CourseGuard = () => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        isEnrolledRequest(id).then(res => {
            setTimeout(() => {
                setIsLoading(false);
                setIsEnrolled(res.data);
            }, 500);
        }).catch(err => {

        });
    }, []);

    if (isLoading) return <Page center><CircularProgress /></Page>

    if (!isEnrolled) return <Navigate to="/dashboard" />

    return (
        <Outlet />
    );
}
 
export default CourseGuard;