'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { User, Mail, Phone, MapPin, Globe, Upload, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import Image from 'next/image';

const UserProfile = () => {
  // Editable photo state
  const [photo, setPhoto] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form data (static data for now)
  const [formData, setFormData] = useState({
    first_name: 'John',
    last_name: 'Doe',
    address_line1: '123 Main Street',
    address_line2: 'Apt 4B',
    city: 'New York',
    country: 'USA',
    employer: 'Acme Corp',
    employment_status: 'Full-time',
    id_card_front: 'id_front.png',
    id_card_back: 'id_back.png',
    job_details: 'Software Engineer',
    postcode: '10001',
    profile_picture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const payload = new FormData();
      if (photo) payload.append('profile_picture', photo);
      payload.append('first_name', formData.first_name);
      payload.append('last_name', formData.last_name);

      toast.success('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-xl rounded-2xl bg-white p-6">
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image 
                    src={photo ? URL.createObjectURL(photo) : '/profile.png'}
                    width={50}
                    height={50}
                    alt="Profile Picture"
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold">{formData.first_name} {formData.last_name}</h2>
              </div>

              {/* Profile Info (read-only) */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <MapPin className="text-blue-500" size={18} />
                  <input type="text" value={formData.address_line1} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <MapPin className="text-blue-500" size={18} />
                  <input type="text" value={formData.address_line2} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <Globe className="text-blue-500" size={18} />
                  <input type="text" value={formData.city} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <Globe className="text-blue-500" size={18} />
                  <input type="text" value={formData.country} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <User className="text-blue-500" size={18} />
                  <input type="text" value={formData.employer} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <User className="text-blue-500" size={18} />
                  <input type="text" value={formData.employment_status} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <CreditCard className="text-blue-500" size={18} />
                  <input type="text" value={formData.id_card_front} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <CreditCard className="text-blue-500" size={18} />
                  <input type="text" value={formData.id_card_back} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <User className="text-blue-500" size={18} />
                  <input type="text" value={formData.job_details} readOnly className="w-full bg-transparent outline-none" />
                </div>

                <div className="flex items-center gap-2 border-b pb-2">
                  <MapPin className="text-blue-500" size={18} />
                  <input type="text" value={formData.postcode} readOnly className="w-full bg-transparent outline-none" />
                </div>
              </div>
            </div>

            {/* Update User Button */}
            <div className="flex justify-end mt-8">
              <Button
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
              >
                Update User
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal for updating editable fields */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

            {/* First Name */}
            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md outline-none"
              />
            </div>

            {/* Profile Picture */}
            <div className="mb-4">
              <label className="block mb-1 cursor-pointer">
                Upload Profile Picture
                <input type="file" className="hidden" onChange={handlePhotoChange} />
              </label>
              {photo && <span className="text-sm text-green-600">{photo.name}</span>}
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="bg-gray-400 text-white rounded-md px-4 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={handleUpdate}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
