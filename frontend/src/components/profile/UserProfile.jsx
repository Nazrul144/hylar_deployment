"use client";
import { motion } from "framer-motion";
import { useContext, useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "../ui/card";
import { User, MapPin, Globe, CreditCard } from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "../../config/config";
import { UserContext } from "../../providers/UserProvider";
import { UserUpdate } from "../ui/UserUpdate";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [photo, setPhoto] = useState("/profile.png");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    employer: "",
    employment_status: "",
    id_card_front: "",
    id_card_back: "",
    job_details: "",
    postcode: "",
    profile_picture: null,
  });

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      console.log("🔄 Fetching profile data...");
      
      const res = await fetch(`${BASE_URL}/api/profiles/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: 'no-store',
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const userData = await res.json();
      console.log("✅ Profile data fetched:", userData.data);
      
      setFormData(userData.data);

      const profilePhoto =
        userData.data.profile_picture &&
        userData.data.profile_picture.startsWith("http")
          ? userData.data.profile_picture
          : userData.data.profile_picture
          ? `${BASE_URL}${userData.data.profile_picture}`
          : "/profile.png";

      const photoWithTimestamp = `${profilePhoto}?t=${Date.now()}`;
      setPhoto(photoWithTimestamp);

      setUser({
        ...userData.data,
        profile_picture: profilePhoto,
      });

    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  }, [setUser]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user) {
      console.log("👤 User context changed:", user);
      
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || prev.first_name,
        last_name: user.last_name || prev.last_name,
        address_line1: user.address_line1 || prev.address_line1,
        address_line2: user.address_line2 || prev.address_line2,
        city: user.city || prev.city,
        country: user.country || prev.country,
        employer: user.employer || prev.employer,
        employment_status: user.employment_status || prev.employment_status,
        job_details: user.job_details || prev.job_details,
        postcode: user.postcode || prev.postcode,
      }));

      if (user.profile_picture) {
        const fullUrl = user.profile_picture.startsWith("http")
          ? user.profile_picture
          : `${BASE_URL}${user.profile_picture}`;
        const photoWithTimestamp = `${fullUrl}?t=${Date.now()}`;
        setPhoto(photoWithTimestamp);
        console.log("📸 Photo updated:", photoWithTimestamp);
      }
    }
  }, [user?.first_name, user?.last_name, user?.profile_picture]);

  return (
    <div className="flex justify-center items-center lg:mt-16 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <Card className="shadow-xl rounded-2xl bg-white dark:bg-gray-900 lg:p-24">
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    key={photo}
                    src={photo}
                    width={144}
                    height={144}
                    alt="Profile Picture"
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {formData.first_name} {formData.last_name}
                </h2>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: MapPin, value: "address_line1", label: "Address Line 1" },
                  { icon: MapPin, value: "address_line2", label: "Address Line 2" },
                  { icon: Globe, value: "city", label: "City" },
                  { icon: Globe, value: "country", label: "Country" },
                  { icon: User, value: "employer", label: "Employer" },
                  { icon: User, value: "employment_status", label: "Employment Status" },
                  { icon: CreditCard, value: "id_card_front", label: "ID Card Front" },
                  { icon: CreditCard, value: "id_card_back", label: "ID Card Back" },
                  { icon: User, value: "job_details", label: "Job Details" },
                  { icon: MapPin, value: "postcode", label: "Postcode" },
                ].map((field) => (
                  <div
                    key={field.value}
                    className="flex items-center gap-2 border-b pb-2 border-gray-300 dark:border-gray-700"
                  >
                    <field.icon className="text-blue-500 dark:text-blue-400" size={18} />
                    <input
                      type="text"
                      value={formData[field.value] || ""}
                      readOnly
                      className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <UserUpdate
                currentFirstName={formData.first_name}
                currentLastName={formData.last_name}
                currentPhoto={photo}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
