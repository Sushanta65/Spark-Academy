
import { useNavigate } from "react-router-dom";
import AllClasses from "../components/Classes";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Reviews from "../components/HomeComponents/Reviews";
import StatisticsSection from "../components/HomeComponents/StatisticsSection";
import InspireTeachersSection from "../components/HomeComponents/InspireTeachersSection";
import PopularClasses from "../components/HomeComponents/PopularClasses";
import PartnerSection from "../components/HomeComponents/PartnerSection";

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
        <div>
            <PartnerSection></PartnerSection>
            <StatisticsSection></StatisticsSection>
            <InspireTeachersSection></InspireTeachersSection>
            <PopularClasses></PopularClasses>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;