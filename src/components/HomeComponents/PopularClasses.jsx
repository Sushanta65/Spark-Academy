import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { Autoplay } from "swiper/modules";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const PopularClasses = () => {
  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/teacher-classes");

      return data.sort((a, b) => b.enrolled - a.enrolled).slice(0, 6);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Data Not Found.</p>;

  return (
    <section className="py-20 mt-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pb-20">
          <div>
            <h2 className="text-4xl font-semibold text-teal-600 px-4">
              Most Popular Classes
            </h2>
            <p className="my-4">
              Find out which courses are gaining the most attention and enrollment from students.
            </p>
            <div className="text-center border-b-2 border-teal-600 w-28 mx-auto"></div>
          </div>
        </div>

        {/* Swiper Slider for Popular Classes */}
        <Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={3} // Show 3 items at once
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 2, // Show 2 items on medium screens
            },
            768: {
              slidesPerView: 1, // Show 1 item on small screens
            },
          }}
        >
          {classes.map((classItem, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 border-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mx-4 mb-8 h-full">
                <Link to={`/class/${classItem._id}`}>
                  <div className="flex flex-col items-center h-full">
                    <img
                      src={classItem.image}
                      alt={classItem.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold text-teal-600">
                      {classItem.title}
                    </h3>
                    <p className="text-lg text-gray-600 mt-2">
                      {classItem.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <FaChalkboardTeacher className="text-teal-600 mr-2" />
                      <span className="text-lg font-medium">
                        {classItem.enrolled} Students Enrolled
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularClasses;
