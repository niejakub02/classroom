import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Page from "../components/Page";
import { canAnswerRequest, isEnrolledRequest } from "./API";

const AnswerGuard = () => {
    const [canAnswer, setCanAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        canAnswerRequest(id).then(res => {
            setTimeout(() => {
                setCanAnswer(res.data);
                setIsLoading(false)
            }, 500);
        }).catch(err => {

        });
    }, []);

    if (isLoading) return <Page center><CircularProgress /></Page>

    if (!canAnswer) return <Navigate to="/dashboard" />

    return (
        <Outlet />
    );
}

export default AnswerGuard;