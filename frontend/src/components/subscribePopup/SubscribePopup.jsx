// components/SubscribePopup.jsx
"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import Swal from "sweetalert2";

const SubscribePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribedFlag = localStorage.getItem("subscribed");
    if (subscribedFlag) {
      setSubscribed(true);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (!localStorage.getItem("subscribed")) {
        setIsOpen(true);
      }
    }, 5000);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    localStorage.setItem("subscribed", "true");
    setSubscribed(true);
    setIsOpen(false);
    Swal.fire({
      title: "Thank you for subscribing!",
      icon: "success",
    });
  };

  if (subscribed) return null;

  return (
    <div>
      {isOpen && (
        <div>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Popup */}
          <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-[750px] bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row overflow-hidden">
            {/* Left Side with Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <Image
                src="/subscribe_image/subscribe.jpg"
                alt="Subscribe"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side with Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 relative flex flex-col justify-center">
              {/* Close button */}
              <Button
                variant="ghost"
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer text-2xl"
                aria-label="Close popup"
              >
                &#10005;
              </Button>

              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900 text-center">
                Subscribe Now
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm md:text-base">
                Join our community and get the latest offers straight to your
                inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#00308F] text-white py-4 md:py-6 text-lg md:text-xl rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Subscribe
                </Button>
                <h3 className="text-center text-sm md:text-base">
                  Hurry!{" "}
                  <span role="img" aria-label="lightning">
                    ⚡
                  </span>
                </h3>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribePopup;
