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
  const { data: classes = [] } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/teacher-classes");
      return data.sort((a, b) => b.enrolled - a.enrolled).slice(0, 6);
    },
  });

  return (
    <section className="py-20  bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center pb-16">
          <h2 className="text-4xl font-semibold text-teal-600">
            Most Popular Classes
          </h2>
          <p className="my-4 text-gray-600">
            Find out which courses are gaining the most attention and enrollment.
          </p>
          <div className="border-b-4 border-teal-600 w-20 mx-auto"></div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {classes.map((classItem) => (
            <SwiperSlide key={classItem._id}>
              <div className="p-3 bg-white border rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
                <Link to={`/class/${classItem._id}`} className="flex flex-col h-full">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="flex-grow flex flex-col justify-between mt-4">
                    <h3 className="text-xl font-semibold text-teal-600">
                      {classItem.title}
                    </h3>
                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {classItem.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <FaChalkboardTeacher className="text-teal-600 mr-2" />
                      <span className="text-lg font-medium text-gray-700">
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
