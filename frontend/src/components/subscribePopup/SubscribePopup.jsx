// components/SubscribePopup.jsx
"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Image from "next/image";

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

    //Send Email to Backend:
    // const res = await fetch('api/subscribe', {
    //     method: "POST",
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({email})
    // })

    // Simulate subscription success
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
          <div className="fixed top-1/2 left-1/2 z-50 w-[750px] max-w-full bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex overflow-hidden">
            {/* Left Side with Image */}
            <div className="w-1/2 flex items-end justify-center relative">
              <Image
                src="/subscribe_iamge/subscribe.png"
                width={800}
                height={900}
                alt="Subscribe"
                objectFit="cover"
                className="max-h-full object-contain absolute bottom-0"
              />
            </div>

            {/* Right Side with Content */}
            <div className="w-1/2 p-8 relative">
              {/* Close button */}
              <Button variant='ghost'
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer text-xl"
                aria-label="Close popup"
              >
                &#10005;
              </Button>

              <h2 className="text-4xl font-bold mb-2 text-blue-900 text-center common-text">
                Subscribe Now
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Join our community and get the latest offers straight to your
                inbox.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col space-y-4"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#00308F] text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribePopup;
