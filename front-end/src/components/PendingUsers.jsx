import { AccountCircle, AccountCircleOutlined, AccountCircleSharp } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { manageEnrollmentRequest } from "../utils/API";
import Page from "./Page";
import UserLabel from "./UserLabel";

const PendingUsersTab = ({ users, isTutor, courseId }) => {
    const [pendingUsers, setPendingUsers] = useState(users);

    const onDecisionHandler = (e, username, decision) => {
        manageEnrollmentRequest(courseId, { username, decision }).then(res => {
            console.log('done');
            setPendingUsers(pendingUsers.filter(user => user.username !== username));
        }).catch(err => {

        });
    }

    return (
        <>
            {
                pendingUsers.length === 0 ?
                    <Page center>No pending users 🧐</Page>
                    :
                    <Page>
                        {pendingUsers.map(user =>
                            <UserLabel
                                user={user}
                                key={user.username}
                            >
                                {
                                    isTutor &&
                                    <ButtonGroup
                                        sx={{ display: isTutor ? 'block' : 'none' }}
                                    >
                                        <Button color="success" onClick={(e) => onDecisionHandler(e, user.username, true)}>Accept</Button>
                                        <Button color="warning" onClick={(e) => onDecisionHandler(e, user.username, false)}>Decline</Button>
                                    </ButtonGroup>
                                }
                            </UserLabel>
                        )}
                    </Page>
            }
        </>
    );
}

export default PendingUsersTab;