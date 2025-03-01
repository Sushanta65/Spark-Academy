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
import FeaturedCourses from "../components/HomeComponents/Blogs";
import FAQs from "../components/HomeComponents/FAQs";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";

const Home = () => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loading/>;
  }
  if (userRole === "admin") {
    navigate("/dashboard/overview");
  }

  return (
    <div>
      <Helmet>
        <title>Home | Spark Academy</title>
      </Helmet>
      <Banner></Banner>
      <PartnerSection></PartnerSection>
      <StatisticsSection></StatisticsSection>
      <PopularClasses></PopularClasses>
      <InspireTeachersSection></InspireTeachersSection>
      <FeaturedCourses></FeaturedCourses>
      <Reviews></Reviews>
      <FAQs></FAQs>
    </div>
  );
};

export default Home;
