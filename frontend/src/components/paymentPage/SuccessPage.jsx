"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(6);

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center border border-green-300"
      >
        <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-600" />

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 text-lg mb-2">
          Redirecting in{" "}
          <span className="font-bold text-green-700">{counter}</span> seconds...
        </p>

        <p className="text-gray-600 text-lg mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

      </motion.div>
    </div>
  );
};

export default SuccessPage;
