import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQs = () => {
  const [activeTab, setActiveTab] = useState(null); // Track which question is active

  const faqs = [
    {
      id: 1,
      question: "What is Spark Academy?",
      answer:
        "Spark Academy is an online learning platform offering courses to students and teachers.",
    },
    {
      id: 2,
      question: "How do I enroll in a course?",
      answer:
        "You can enroll by clicking the 'Enroll Now' button on the course card and completing the process.",
    },
    {
      id: 3,
      question: "Do you offer certificates?",
      answer:
        "Yes, we provide certificates upon course completion.",
    },
    {
      id: 4,
      question: "How do I get my certificate?",
      answer:
        "Once you complete the course and pass the final assessment, you will be able to download your certificate.",
    },
  ];

  const toggleTab = (id) => {
    if (activeTab === id) {
      setActiveTab(null); 
    } else {
      setActiveTab(id); 
    }
  };

  return (
    <div className="bg-white py-20 px-6">
      <div className="container mx-auto max-w-4xl">
      <div className="text-center pb-20">
          <div className="">
            <h2 className="text-4xl font-semibold text-teal-600 px-4">
            Frequently Asked Questions
            </h2>
            <p className="my-4">We’re proud to partner with industry leaders who help us achieve excellence.</p>
            <div className="text-center  border-b-2 border-teal-600 w-28 mx-auto "></div>
          </div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleTab(faq.id)}
              >
                <div className="flex items-center">
                  <FaQuestionCircle className="text-teal-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                </div>
                <div className="text-teal-600">
                  {activeTab === faq.id ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </div>
              </div>

          
              {activeTab === faq.id && (
                <p className="text-gray-600 text-sm mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
