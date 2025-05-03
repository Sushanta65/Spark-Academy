import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
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
    <section className="py-20 bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center pb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-teal-600 mb-2">Most Popular Classes</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find out which courses are gaining the most attention and enrollment.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
        </motion.div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {classes.map((classItem, index) => (
            <SwiperSlide key={classItem._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/class/${classItem._id}`}
                  className="bg-white bg-opacity-30 backdrop-blur-lg border border-teal-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden h-full"
                >
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <h3 className="text-xl font-semibold text-teal-700">
                      {classItem.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                      {classItem.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-teal-700 font-medium">
                      <FaChalkboardTeacher />
                      <span>{classItem.enrolled} Students Enrolled</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularClasses;
