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
    <div className="py-10 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">
          What Students Are Saying
        </h2>
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
