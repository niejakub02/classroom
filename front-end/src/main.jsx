import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './Theme'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routes/Home'
import DashboardPage from './routes/Dashboard'
import ErrorPage from './routes/Error'
import ProtectedRoute from './utils/ProtectedRoute'
import Layout from './components/Layout'
import EnrolledPage from './routes/Enrolled'
import TutoredPage from './routes/Tutored'
import CoursePage from './routes/Course'
import CourseGuard from './utils/CourseGuard'
import AddCoursePage from './routes/AddCourse'
import SignUpPage from './routes/SignUp'
import AnswerGuard from './utils/AnswerGuard'
import AddTaskPage from './routes/AddTask'
import TutorGuard from './utils/TutorGuard'
import AnswerPage from './routes/Answer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />
          },
          {
            path: "enrolled",
            element: <EnrolledPage />
          },
          {
            path: "tutored",
            element: <TutoredPage />
          },
          {
            path: "addCourse",
            element: <AddCoursePage />
          },
          {
            element: <CourseGuard />,
            children: [
              {
                path: "course/:id",
                element: <CoursePage />
              },
            ]
          },
          {
            element: <AnswerGuard />,
            children: [
              {
                path: "answer/:id",
                element: <AnswerPage />
              }
            ]
          },
          {
            element: <TutorGuard />,
            children: [
              {
                path: "course/:id/addTask",
                element: <AddTaskPage />
              }
            ]
          }

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
