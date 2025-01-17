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
                        element: <AllClasses></AllClasses>
                    },
                    {
                        path: '/dashboard/users',
                        element: <Users/>
                    }
                ]
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/teach-on-spark-academy',
                element: <TeachOnSparkAcademy></TeachOnSparkAcademy>
            }
        ]
    }
])

export default router;