import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_Pk);

const Payment = () => {
  const [classInfo, setClassInfo] = useState({});
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/class-details/${id}`).then((res) => {
      setClassInfo(res.data);
    });
  }, [axiosPublic, id]);

  return (
    <Elements stripe={stripePromise}>
      <div className="pt-10  flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-teal-600 mb-10 text-center">
          Complete Your Payment
        </h2>
          <div className="mb-6">
            
            {classInfo ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{classInfo.title}</h3>
                  <p className="text-gray-800 font-medium mt-2">
                    Total Paybill: <span className="text-teal-600">${classInfo.price}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading class details...</p>
            )}
          </div>

          <div>
            
            <CheckoutForm></CheckoutForm>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
