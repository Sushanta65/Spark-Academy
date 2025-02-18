import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import banner1 from '../../assets/banner-1.png'
import banner2 from '../../assets/banner-2.png'
import banner3 from '../../assets/banner-3.png'
import { Link } from "react-router-dom";

const Banner = () => {
  // Data for the sliders
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Empowering Students for a Brighter Future",
      description: "Explore resources, classes, and opportunities to learn and grow.",
      buttonText: "Explore Now",
      path: '/classes'
    },
    {
      id: 2,
      image: banner2,
      title: "Inspiring Teachers, Inspiring Lives",
      description: "Join a community of educators making a difference.",
      buttonText: "Join as a Teacher",
      path: '/teach-on-spark-academy'
    },
    {
      id: 3,
      image: banner3,
      title: "Learn, Teach, and Grow Together",
      description: "Start your journey of teaching and learning today.",
      buttonText: "Get Started",
      path: '/classes'
    },
  ];

  return (
    <div className="bg-gray-100">
      <Swiper
        
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay, Navigation]}
        className="h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-6">
                <div>
                  <h1 className="text-3xl md:text-6xl font-bold text-gray-300 mb-4 w-[90%] mx-auto leading-snug">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-300 my-10">{slide.description}</p>
                  <Link to={slide.path}>
                  <button className="btn bg-teal-500 text-white hover:bg-teal-600">
                    {slide.buttonText}
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
