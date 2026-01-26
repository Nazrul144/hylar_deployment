'use client'
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const router = useRouter();
    const [counter, setCounter] = useState(5);
  
    useEffect(() => {
      // Countdown interval
      const interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
  
      // Redirect after 5 seconds
      const timer = setTimeout(() => {
        router.push("/register/register2/register3/register4/register5/register6/register7/register8");
      }, 5000);
  
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-liner-to-br from-red-50 to-red-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center border border-red-300"
      >
        <XCircle className="w-20 h-20 mx-auto mb-4 text-red-600" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
        <p className="text-gray-600 text-lg mb-6">
          Something went wrong while processing your payment..!! Please try again.
        </p>
        <p className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all">
          Redirecting in{" "}
          {counter} seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
