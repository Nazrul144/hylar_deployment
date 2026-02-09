"use client";
import { motion } from "framer-motion";
import { useContext, useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "../ui/card";
import {
  User,
  MapPin,
  Globe,
  CreditCard,
  BadgeCheck,
  Briefcase,
  Mail,
  Phone,
  Building2,
  Hash,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "../../config/config";
import { UserContext } from "../../providers/UserProvider";
import { UserUpdate } from "../ui/UserUpdate";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [photo, setPhoto] = useState("/profile.png");
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "1990-01-15",
    mobile_number: "+1234567890",
    profile_picture: null,
    employer_status: "",
    employer_type: "",
    job_details: "",
    id_card_front_image: "",
    id_card_back_image: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    postcode: "",
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
        cache: "no-store",
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

      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || prev.first_name,
        last_name: user.last_name || prev.last_name,
        email: user.email || prev.email,
        mobile_number: user.mobile_number || prev.mobile_number,
        address_line1: user.address_line1 || prev.address_line1,
        address_line2: user.address_line2 || prev.address_line2,
        city: user.city || prev.city,
        country: user.country || prev.country,
        employer_type: user.employer_type || prev.employer_type,
        employer_status: user.employer_status || prev.employer_status,
        job_details: user.job_details || prev.job_details,
        postcode: user.postcode || prev.postcode,
        id_card_front_image: user.id_card_front_image || prev.id_card_front_image,
        id_card_back_image: user.id_card_back_image || prev.id_card_back_image,
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
  }, [user?.first_name, user?.last_name, user?.profile_picture, user?.email, user?.mobile_number]);

  const handleViewImage = (imageUrl, title) => {
    const fullUrl = imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`;
    setModalImage(fullUrl);
    setModalTitle(title);
    setShowImageModal(true);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;
  };

  console.log("formData", formData);

  return (
    <>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formData.email}
                  </p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Mail,
                      value: "email",
                      label: "Email Address",
                    },
                    {
                      icon: Phone,
                      value: "mobile_number",
                      label: "Mobile Number",
                    },
                    {
                      icon: Building2,
                      value: "employer_type",
                      label: "Employer Type",
                    },
                    {
                      icon: BadgeCheck,
                      value: "employer_status",
                      label: "Employer Status",
                    },
                    {
                      icon: Briefcase,
                      value: "job_details",
                      label: "Job Details",
                    },
                    {
                      icon: MapPin,
                      value: "address_line1",
                      label: "Address Line 1",
                    },
                    {
                      icon: MapPin,
                      value: "address_line2",
                      label: "Address Line 2",
                    },
                    {
                      icon: Building2,
                      value: "city",
                      label: "City",
                    },
                    {
                      icon: Globe,
                      value: "country",
                      label: "Country",
                    },
                    {
                      icon: Hash,
                      value: "postcode",
                      label: "Postcode",
                    },
                  ].map((field) => (
                    <div
                      key={field.value}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      <field.icon
                        className="text-blue-500 dark:text-blue-400 flex-shrink-0"
                        size={20}
                      />
                      <div className="flex-1 min-w-0">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={formData[field.value] || ""}
                          readOnly
                          placeholder={`No ${field.label.toLowerCase()}`}
                          className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 truncate"
                        />
                      </div>
                    </div>
                  ))}

                  {/* ID Card Front Image */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <CreditCard
                      className="text-blue-500 dark:text-blue-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        ID Card Front
                      </label>
                      {formData.id_card_front_image ? (
                        <button
                          onClick={() =>
                            handleViewImage(
                              formData.id_card_front_image,
                              "ID Card - Front Side"
                            )
                          }
                          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Eye size={16} />
                          View Image
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                          Not uploaded
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ID Card Back Image */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <CreditCard
                      className="text-blue-500 dark:text-blue-400 flex-shrink-0"
                      size={20}
                    />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        ID Card Back
                      </label>
                      {formData.id_card_back_image ? (
                        <button
                          onClick={() =>
                            handleViewImage(
                              formData.id_card_back_image,
                              "ID Card - Back Side"
                            )
                          }
                          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Eye size={16} />
                          View Image
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                          Not uploaded
                        </span>
                      )}
                    </div>
                  </div>
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

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {modalTitle}
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <Image
                src={modalImage}
                alt={modalTitle}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;