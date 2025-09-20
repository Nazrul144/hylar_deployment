// components/SubscribePopup.jsx
"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SubscribePopup =() => {
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

  const handleSubscribe = async(e) => {
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
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          <div className="fixed top-1/2 left-1/2 z-50 w-96 max-w-full p-6 bg-white rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              aria-label="Close popup"
            >
              &#10005;
            </button>

            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-4"
            >
              <input
                type="email"
                placeholder="Your email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SubscribePopup;
