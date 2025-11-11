"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiCamera } from "react-icons/fi";
import { BASE_URL } from "@/config/config";
import toast from "react-hot-toast";
import { UserContext } from "@/providers/UserProvider";

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


  useEffect(() => {
    setFirstName(currentFirstName || "");
    setLastName(currentLastName || "");

    if (currentPhoto) {
      // Ensure full image URL
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
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { setUser } = useContext(UserContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("⚠️ Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      if (photo instanceof File) formData.append("profile_picture", photo);

      const res = await fetch(`${BASE_URL}/api/profiles/update-profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Profile update failed");


      if (onProfileUpdate) {
        onProfileUpdate(preview, firstName, lastName);
      }

      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error(" Profile update failed:", err);
      toast.error("Something went wrong. Try again!");
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
          bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500
          transition-all duration-500 hover:from-blue-500 hover:via-cyan-400 hover:to-sky-400
          hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_20px_4px_rgba(56,189,248,0.6)]"
        >
          {loading ? "Loading..." : "Update Profile"}
        </Button>
      </DialogTrigger>

   
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mx-auto">
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Update Your Profile
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
    
            <div className="flex flex-col items-center gap-2">
              <Label className="text-center">Profile Image</Label>
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
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

         
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="justify-between mt-5">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white hover:shadow-[0_0_15px_3px_rgba(56,189,248,0.6)] transition-all duration-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
