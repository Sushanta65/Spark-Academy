
import { useNavigate } from "react-router-dom";
import AllClasses from "../components/Classes";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Reviews from "../components/HomeComponents/Reviews";
import StatisticsSection from "../components/HomeComponents/StatisticsSection";
import InspireTeachersSection from "../components/HomeComponents/InspireTeachersSection";
import PopularClasses from "../components/HomeComponents/PopularClasses";
import PartnerSection from "../components/HomeComponents/PartnerSection";
import Banner from "../components/HomeComponents/Banner";

const Home = () => {
    const {userRole, loading} = useAuth()
    const navigate = useNavigate()
        
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
            <Banner></Banner>
            <PartnerSection></PartnerSection>
            <StatisticsSection></StatisticsSection>
            <PopularClasses></PopularClasses>
            <InspireTeachersSection></InspireTeachersSection>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;