import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Using react-icons for status icons
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/payments-history/${user?.email}`).then((res) => {
      setPayments(res.data);
    });
  }, [axiosSecure, user?.email]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-teal-700">
        Payment History
      </h2>
      <div className="overflow-x-auto  border border-teal-200">
        <table className="table w-full text-gray-700">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Class ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id["$oid"]} className="hover:bg-teal-50">
                  <td className="py-3 px-4">{payment.email}</td>
                  <td className="py-3 px-4">{payment.name}</td>
                  <td className="py-3 px-4">{payment.transactionId}</td>
                  <td className="py-3 px-4">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{payment.classId}</td>
                  <td className="py-3 px-4">
                    <div
                      className={`flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                        payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {payment.status === "pending" ? (
                        <>
                          <FaTimes className="text-yellow-600" />
                          Pending
                        </>
                      ) : (
                        <>
                          <FaCheck className="text-green-600" />
                          Completed
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-teal-700">
                  No payment history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
