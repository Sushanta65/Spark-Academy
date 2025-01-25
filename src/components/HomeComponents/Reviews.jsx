import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReactStars from "react-rating-stars-component";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err.message);
      });
  }, [axiosSecure]);

  return (
    <div className="pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
      <div className="text-center pt-20">
      <div className="text-center pb-20">
          <div className="">
            <h2 className="text-4xl font-semibold text-teal-600 px-4">
              What Our Students Say
            </h2>
            <p className="my-4">Students share how our platform helped them grow academically and professionally.</p>
            <div className="text-center  border-b-2 border-teal-600 w-28 mx-auto "></div>
          </div>
        </div>
        </div>
        {reviews.length > 0 ? (
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            className="rounded-lg"
          >
            {reviews.map((feedback) => (
              <SwiperSlide key={feedback._id} className="flex justify-center">
                <div className="card shadow-md rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={feedback.studentImage}
                      alt={feedback.studentName}
                      className="rounded-full object-cover shadow-md w-16 h-16"
                    />
                    
                    <div className="mt-3 text-center">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feedback.studentName}
                      </h3>
                      <p className="text-gray-500 text-sm italic">
                        {feedback.classTitle}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                    <ReactStars
                      count={5}
                      size={24}
                      value={feedback.rating}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {`"${feedback.review}"`}
                  </p>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-600">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
