
import { useNavigate } from "react-router-dom";
import AllClasses from "../components/Classes";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Home = () => {
    const {userRole, loading} = useAuth()
    const navigate = useNavigate()
        // Check if user is an admin
        if(loading){
            return (
                <div>Loading</div>
            )
        }
        if (userRole === "admin") {
            navigate('/dashboard/my-profile')// Redirect to dashboard
        }
     
    

    return (
        <div className='container mx-auto'>
            
        </div>
    );
};

export default Home;