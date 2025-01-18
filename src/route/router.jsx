import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import Dashboard from "../Pages/Dashboard";
import AllClasses from "../Pages/DashboardPages/AllClasses";
import Classes from "../components/Classes";
import PrivateRoute from "./PrivateRoute";
import Users from "../Pages/DashboardPages/Users";
import TeachOnSparkAcademy from "../Pages/TeachOnSparkAcademy";
import TeacherRequest from "../Pages/Admin/TeacherRequest";
import AdminRoute from "./AdminRoute";
import AddClass from "../Pages/Teacher/AddClass";
import TeacherRoute from "./TeacherRoute";
import MyClasses from "../Pages/Teacher/MyClasses";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/signin',
                element: <SignIn/>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard/all-classes',
                        element: <AdminRoute><AllClasses></AllClasses></AdminRoute>
                    },
                    {
                        path: '/dashboard/users',
                        element: <AdminRoute><Users/></AdminRoute>
                    },
                    {
                        path: '/dashboard/teacher-request',
                        element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
                    },
                    {
                        path: '/dashboard/add-class',
                        element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
                    },
                    {
                        path: '/dashboard/my-class',
                        element: <TeacherRoute><MyClasses></MyClasses></TeacherRoute>
                    }
                ]
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/teach-on-spark-academy',
                element: <PrivateRoute><TeachOnSparkAcademy></TeachOnSparkAcademy></PrivateRoute>
            }
        ]
    }
])

export default router;