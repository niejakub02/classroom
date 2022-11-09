import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/';

const axiosClient = axios.create({
    baseURL: BASE_URL
});

axiosClient.interceptors.request.use(res => {
    res.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return res;
});

export const signInRequest = (data) =>
    axiosClient.post('/signIn', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

export const signUpRequest = (data) =>
    axiosClient.post('/users', data);

export const verifyRequest = () =>
    axiosClient.get('/token/verify');

export const allCoursesRequest = () =>
    axiosClient.get('/courses');

export const enrolledCoursesRequest = () =>
    axiosClient.get('/courses/enrolled');

export const tutoredCoursesRequest = () =>
    axiosClient.get('/courses/tutored');

export const notEnrolledCoursesRequest = () =>
    axiosClient.get('/courses/notEnrolled');

export const enrollCourseRequest = (courseId) =>
    axiosClient.get(`/courses/${courseId}/enroll`);

export const courseRequest = (courseId) =>
    axiosClient.get('/courses', {
        params: { id: courseId }
    });

export const userDetailsRequest = (courseId) =>
    axiosClient.get(`/courses/${courseId}/userDetails`);

export const isEnrolledRequest = (courseId) =>
    axiosClient.get(`/courses/${courseId}/isEnrolled`);

export const manageEnrollmentRequest = (courseId, data) =>
    axiosClient.post(`/courses/${courseId}/manageEnrollment`, data);

export const kickUserRequst = (courseId, data) =>
    axiosClient.post(`/courses/${courseId}/kickUser`, data);

export const leaveCourseRequest = (courseId) =>
    axiosClient.get(`/courses/${courseId}/leaveCourse`);

export const deleteCourseRequest = (courseId) =>
    axiosClient.get(`/courses/${courseId}/deleteCourse`);

export const addCourseRequest = (data) =>
    axiosClient.post('/courses', data)

export const canAnswerRequest = (taskId) =>
    axiosClient.get(`/answers/${taskId}/canAnswer`)

export const getAnswerRequest = (taskId) =>
    axiosClient.get(`/answers/${taskId}`);

export const addTaskRequest = (courseId, data) =>
    axiosClient.post(`/courses/${courseId}/addTask`, data);

export const getCourseByTaskRequest = (taskId) =>
    axiosClient.get(`/courses/byTask/${taskId}`);

export const editAnswerRequest = (answerId, data) =>
    axiosClient.put(`/answers/${answerId}`, data);

export const deleteAnswerRequest = (answerId) =>
    axiosClient.delete(`/answers/${answerId}`);

export const addScoreToAnswerRequest = (answerId, data) =>
    axiosClient.put(`/answers/${answerId}/addScore`, data);

export default axiosClient;