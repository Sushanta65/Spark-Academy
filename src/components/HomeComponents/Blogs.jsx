import React, { useState, useEffect } from "react";
import blog1 from "../../assets/blog-1.jpg";
import blog2 from "../../assets/blog-2.jpg";
import blog3 from "../../assets/blog-3.jpg";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Importance of Continuous Learning",
      description:
        "Explore how continuous learning can transform your professional and personal life.",
      image: blog1,
      link: "/blog/importance-of-learning",
    },
    {
      id: 2,
      title: "Top 5 Study Tips for Students",
      description:
        "Discover effective study strategies to improve focus and retain information better.",
      image: blog2,
      link: "/blog/study-tips",
    },
    {
      id: 3,
      title: "How Technology Enhances Education",
      description:
        "Learn how technology is shaping the future of education and making learning accessible.",
      image: blog3,
      link: "/blog/technology-in-education",
    },
  ];

  return (
    <div className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center pb-20">
          <div className="">
            <h2 className="text-4xl font-semibold text-teal-600 px-4">
            Latest Blogs
            </h2>
            <p className="my-4">We’re proud to partner with industry leaders who help us achieve excellence.</p>
            <div className="text-center  border-b-2 border-teal-600 w-28 mx-auto "></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow overflow-hidden text-ellipsis">
                  {blog.description}
                </p>
                <div className="mt-auto">
                  <a
                    href={blog.link}
                    className="inline-block text-teal-600 font-medium hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
