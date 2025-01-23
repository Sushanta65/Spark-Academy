import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
 const axiosSecure = useAxiosSecure()
 const {user, classItem} = useAuth()
 const navigate = useNavigate()
 

console.log(user)

useEffect(() => {
  axiosSecure.post('/create-payment-intent', {price: classItem.price})
  .then(res => {
    setClientSecret(res.data.clientSecret)
  })
},[axiosSecure, classItem])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
  
      if (error) {
        console.error(error);
        setError(error.message)
      } else {
        console.log("Payment successful!", paymentMethod);
        
      }

      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details:{
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'

          }
        }
      })
      if(confirmError){
        setError(confirmError.message)
      }else{
        console.log(paymentIntent)
        if(paymentIntent.status === 'succeeded'){

          const paymentData = {
            email: user?.email,
            name: user?.displayName,
            transactionId: paymentIntent.id,
            date: new Date(),
            classId: classItem._id,
            status: 'pending'

          }
            axiosSecure.post('/payments', paymentData)
            .then(res => {
              if(res.data.insertedId){

                const { _id, ...classWithoutId } = classItem;
                const enrollInfo = {
                  studentEmail: user?.email,
                  classId: _id,
                  ...classWithoutId
                }
                axiosSecure.post('/enrolled-classes', enrollInfo)
                .then(res => {
                  if(res.data.insertedId){
                    Swal.fire({
                      title: "Your Payment Successfull. And You Enrolled In The Class",
                      text: `Your TrnxId: ${paymentIntent.id}`,
                      icon: "success",
                      draggable: true
                    });
                    axiosSecure.patch(`/teacher-class/${classItem._id}`, {enrolled: classItem.enrolled,
                    })
                    .then(res => {
                      console.log('enrolled updated', res)
                    })
                    console.log(res)
                    navigate('/dashboard/my-enroll')
                  }
                  if(res.data.message === 'already-enrolled'){
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "You Already Enrolled in This Course!",
                      footer: 'Try another class.'
                    });
                  }
                })
              
                
              }
            })

        }
      }
  };

  console.log(clientSecret)
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="card-element"
          >
            Card Details
          </label>
          <div className="border rounded p-3 shadow-sm bg-gray-50">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#fa755a" },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Pay Now
        </button>
        <p className="text-red-600">{error}</p>
        
      </form>
    </div>
  );
};

export default CheckoutForm;
