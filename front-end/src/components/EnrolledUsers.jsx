import { AccountCircle, AccountCircleOutlined, AccountCircleSharp } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { kickUserRequst, manageEnrollmentRequest } from "../utils/API";
import Page from "./Page";
import UserLabel from "./UserLabel";

const EnrolledUsersTab = ({ users, isTutor, userId, courseId }) => {
    const [enrolledUsers, setEnrolledUsers] = useState(users);

    const onRemoveHandler = (e, username) => {
        kickUserRequst(courseId, { username }).then(res => {
            console.log('done');
            // e.target.parentNode.parentNode.remove();
            setEnrolledUsers(enrolledUsers.filter(user => user.username !== username));
        }).catch(err => {
            // napisac error ze nie mozna usunac siebie
        });
    }

    return (
        <>
            {
                users.length === 0 ?
                    <Page center>No enrolled users 🧐</Page>
                    :
                    <Page>
                        {enrolledUsers.map(user =>
                            <UserLabel
                                user={user}
                                key={user.username}
                            >
                                {
                                    isTutor &&
                                    <ButtonGroup
                                        sx={{ display: isTutor ? 'block' : 'none' }}
                                    >
                                        <Button
                                            color="error"
                                            onClick={(e) => onRemoveHandler(e, user.username)}
                                            disabled={user.id === userId}
                                        >
                                            Remove
                                        </Button>
                                    </ButtonGroup>
                                }
                            </UserLabel>
                        )}
                    </Page>
            }
        </>
    );
}

export default EnrolledUsersTab;