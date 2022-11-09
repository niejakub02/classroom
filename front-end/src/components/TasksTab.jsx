import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Page from "./Page";
import { Link, useNavigate } from "react-router-dom";
import { addScoreToAnswerRequest, deleteAnswerRequest } from "../utils/API";


const TasksTab = ({ tasks, isTutor, courseId, userId, setCourse }) => {
    const [expanded, setExpanded] = useState(null);
    const [value, setValue] = useState(null);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(value);
    }, [value])
    const handleChange = (taskId) => (e, isExpanded) => {
        setValue(null);
        setExpanded(isExpanded ? taskId : null);
    };

    const addScoreHandler = () => {
        if (!value) return;

        addScoreToAnswerRequest(value.answerId, { score: Number(score) }).then(res => {
            console.log('done');
        }).then(err => {
            navigate(0);
        });
    }

    return (
        <Page>
            {isTutor &&
                <Button
                    variant="outlined"
                    component={Link}
                    to={`addTask`}
                >
                    Add task
                </Button>
            }
            {
                tasks.length === 0 ?
                    <Page center>No tasks at the moment 🧐</Page>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {tasks.map(task => {
                            let answerId = null;
                            let currentScore = null;
                            const userAnswered = !!task.answers.find(answer => {
                                if (answer.answeredBy.id === userId) {
                                    answerId = answer.id;
                                    currentScore = answer.score;
                                    return true;
                                }

                                return false;
                            });
                            const taskActive = task.endsAt > Date.now();
                            return (
                                <Accordion
                                    expanded={expanded === task.id}
                                    onChange={handleChange(task.id)}
                                    sx={{
                                        width: '65%', py: 1, '&.Mui-disabled': {
                                            backgroundColor: 'rgba(0, 0, 0, .33)'
                                        }
                                    }}
                                    key={task.id + '_TASK'}
                                    disabled={isTutor ? false : (!taskActive)}

                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ '& > div': { flexWrap: 'wrap', display: 'flex', flexDirection: 'column' } }}
                                    >
                                        <Typography sx={{ width: '100%', flexShrink: 0 }} fontSize="1.2rem">
                                            {'Task no. ' + task.id}
                                        </Typography>
                                        {
                                            (taskActive || isTutor) ?
                                                null :
                                                <Typography
                                                    fontSize="1.2rem"
                                                    color={userAnswered ? 'success.main' : 'error.main'}
                                                >
                                                    {`Your score: ${!!currentScore ? currentScore : 0}/10`}
                                                </Typography>
                                        }
                                        <Typography sx={{ color: userAnswered ? 'success.main' : (taskActive ? 'primary.main' : (isTutor ? 'warning.main' : 'error.main')) }} fontSize="1.2rem">
                                            {'Ends at: ' + task.endsAt.toLocaleString()}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pb: 0 }}>
                                        <Typography sx={{ wordBreak: 'break-all' }}>
                                            {task.content}
                                        </Typography>
                                        {
                                            isTutor ?
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', my: '1.25rem' }}>
                                                    <Box sx={{ display: 'flex', gap: '1.25rem' }}>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            onChange={(e, newValue) => setValue(newValue)}
                                                            options={task.answers.map((answer, index) => ({
                                                                score: answer.score,
                                                                taskId: task.id,
                                                                answerId: answer.id,
                                                                label: answer.answeredBy.username,
                                                                content: answer.content
                                                            }))}
                                                            sx={{ flex: '3 1 0' }}
                                                            renderInput={(params) => <TextField {...params} label="Select user" />}
                                                            isOptionEqualToValue={(option, value) => option.label === value.label}
                                                        />
                                                        <TextField
                                                            type="number"
                                                            sx={{ flex: '1 1 0' }}
                                                            label="Score"
                                                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                                                            onChange={(e) => setScore(e.target.value)}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            sx={{ flex: '1 1 0' }}
                                                            onClick={addScoreHandler}
                                                            disabled={!value}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Box>
                                                    {
                                                        (value && value.taskId === task.id) ?
                                                            <>
                                                                <Typography
                                                                    color="success.main"
                                                                >
                                                                    {`Current score: ${value.score}`}
                                                                </Typography>
                                                                <Typography>
                                                                    {value.content}
                                                                </Typography>
                                                            </>
                                                            : null
                                                    }
                                                </Box>
                                                :
                                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        component={Link}
                                                        to={`/answer/${task.id}`}
                                                        color={userAnswered ? "success" : "primary"}
                                                        size="large"
                                                    >
                                                        {!userAnswered ? 'Answer' : 'Edit'}
                                                    </Button>
                                                </Box>
                                        }

                                    </AccordionDetails>
                                </Accordion>
                            )
                        }
                        )}
                    </Box>
            }
        </Page>

    );
}

export default TasksTab;