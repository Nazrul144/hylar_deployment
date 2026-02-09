"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { FiCamera } from "react-icons/fi";
import { BASE_URL } from "../../config/config";
import toast from "react-hot-toast";
import { UserContext } from "../../providers/UserProvider";

export function UserUpdate({
  currentFirstName,
  currentLastName,
  currentPhoto,
  onProfileUpdate,
}) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("/profile.png");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setFirstName(currentFirstName || "");
    setLastName(currentLastName || "");

    if (currentPhoto) {
      const fullPhoto = currentPhoto.startsWith("http")
        ? currentPhoto
        : `${BASE_URL}${currentPhoto}`;
      setPreview(fullPhoto);
    } else {
      setPreview("/profile.png");
    }
  }, [currentFirstName, currentLastName, currentPhoto]);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("📸 Photo selected:", file.name, file.type, file.size);
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access");
    console.log("🔑 Token check:", token ? "Found" : "Not found");

    if (!token || token === "null" || token === "undefined") {
      toast.error("⚠️ Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      if (photo && photo instanceof File) {
        formData.append("profile_picture", photo);
        console.log("📤 Uploading photo:", photo.name);
      }

      console.log("🔵 Sending update request to:", `${BASE_URL}/api/accounts/profile/update/`);
      console.log("📋 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const res = await fetch(`${BASE_URL}/api/accounts/profile/update/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("🟢 Server Response Status:", res.status);
      console.log("🟢 Server Response Data:", data);

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("⚠️ Session expired. Please log in again.");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return;
        }
        throw new Error(data?.message || data?.detail || "Profile update failed");
      }

      let newPhotoUrl = null;
      if (data.data?.profile_picture) {
        newPhotoUrl = data.data.profile_picture.startsWith("http")
          ? data.data.profile_picture
          : `${BASE_URL}${data.data.profile_picture}`;
        console.log("📸 New photo URL from server:", newPhotoUrl);
      }

      const updatedUser = {
        ...user,
        ...data.data,
        first_name: data.data.first_name || firstName,
        last_name: data.data.last_name || lastName,
      };

      if (newPhotoUrl) {
        updatedUser.profile_picture = newPhotoUrl;
      }

      console.log("✅ Updating user context with:", updatedUser);
      setUser(updatedUser);

      toast.success("✅ Profile updated successfully!");

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error("❌ Profile update failed:", err);
      toast.error(err.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          disabled={loading}
          className="relative px-6 py-2 rounded-xl text-white font-semibold 
          bg-linear-to-r from-sky-400 via-blue-500 to-cyan-500
          transition-all duration-500 hover:from-blue-500 hover:via-cyan-400 hover:to-sky-400
          hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_20px_4px_rgba(56,189,248,0.6)]"
        >
          {loading ? "Loading..." : "Update Profile"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-100">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mx-auto">
            <DialogTitle className="text-center text-2xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Update Your Profile
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="flex flex-col items-center gap-2">
              <Label className="text-center dark:text-gray-200">Profile Image</Label>
              <div className="relative w-32 h-32">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-blue-500 shadow-md cursor-pointer"
                  onClick={() => document.getElementById("profileUpload").click()}
                />
                <div
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => document.getElementById("profileUpload").click()}
                >
                  <FiCamera className="text-white" size={18} />
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                id="profileUpload"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="first-name" className="dark:text-gray-200">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last-name" className="dark:text-gray-200">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                required
              />
            </div>
          </div>

          <DialogFooter className="justify-between mt-5">
            <DialogClose asChild>
              <Button 
                type="button"
                variant="outline" 
                disabled={loading} 
                className="dark:border-gray-600 dark:text-gray-200"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-linear-to-r from-sky-500 via-blue-600 to-cyan-500 text-white hover:shadow-[0_0_15px_3px_rgba(56,189,248,0.6)] transition-all duration-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}