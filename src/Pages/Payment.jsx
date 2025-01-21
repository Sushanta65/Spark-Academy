import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load Stripe with your publishable key
// const stripePromise = loadStripe("your-publishable-key");

const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!stripe || !elements) {
    //   return; // Stripe.js not loaded
    // }

    // const card = elements.getElement(CardElement);
    // if (!card) {
    //   return;
    // }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // if (error) {
    //   console.error(error);
    //   alert(error.message);
    // } else {
    //   console.log("Payment successful!", paymentMethod);
    //   alert("Payment successful!");
    //   // Send `paymentMethod.id` to your server for processing
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Complete Your Payment
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="card-element">
          Card Details
        </label>
        <div className="border rounded p-3 shadow-sm bg-gray-50">
          {/* <CardElement
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
          /> */}
          df
        </div>
      </div>
      <button
        type="submit"
        // disabled={!stripe}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    // <Elements stripe={stripePromise}>
    //   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    //     <CheckoutForm />
    //   </div>
    // </Elements>
    <div>Payment</div>
  );
};

export default Payment;
