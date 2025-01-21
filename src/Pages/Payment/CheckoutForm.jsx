import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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
        alert(error.message);
      } else {
        console.log("Payment successful!", paymentMethod);
        alert("Payment successful!");
        // Send `paymentMethod.id` to your server for processing
      }
  };
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
          disabled={!stripe}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
