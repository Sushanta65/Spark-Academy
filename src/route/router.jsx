import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import Dashboard from "../Pages/Dashboard";
import Classes from "../components/Classes";
import PrivateRoute from "./PrivateRoute";
import Users from "../Pages/DashboardPages/Users";
import TeachOnSparkAcademy from "../Pages/TeachOnSparkAcademy";
import TeacherRequest from "../Pages/Admin/TeacherRequest";
import AddClass from "../Pages/Teacher/AddClass";
import MyClasses from "../Pages/Teacher/MyClasses";
import ClassesAdmin from "../Pages/Admin/ClassesAdmin";
import UpdateClass from "../Pages/Teacher/UpdateClass";


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
                        element: <ClassesAdmin></ClassesAdmin>
                    },
                    {
                        path: '/dashboard/users',
                        element: <Users/>
                    },
                    {
                        path: '/dashboard/teacher-request',
                        element: <TeacherRequest></TeacherRequest>
                    },
                    {
                        path: '/dashboard/add-class',
                        element: <AddClass></AddClass>
                    },
                    {
                        path: '/dashboard/my-class',
                        element: <MyClasses></MyClasses>
                    },
                    {
                        path: '/dashboard/my-class/:id',
                        element: <UpdateClass></UpdateClass>
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