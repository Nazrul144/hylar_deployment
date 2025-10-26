'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { CreditCard, Globe, Mail, MapPin, Phone, Upload, User } from 'lucide-react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

const UserProfile = () => {
  // File states
  const [photo, setPhoto] = useState(null);
  const [idCard, setIdCard] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    username: 'John Doe',
    email: 'john@example.com',
    phone: '',
    country: '',
    city: '',
    status: 'Active',
    address: '',
    postCode: ''
  });

  // Handlers for file uploads
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleIdChange = (e) => setIdCard(e.target.files[0]);

  // Handler for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update profile
  const handleUpdate = async () => {
    try {
      const payload = new FormData();
      payload.append('photo', photo);
      payload.append('idCard', idCard);
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));

      // Send data to backend API
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        body: payload
      });
      const data = await res.json();
      toast.success("Profile updated successfully!")
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md hover:shadow-blue-200 transition-all">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={photo ? URL.createObjectURL(photo) : '/default-user.png'}
                    alt="User Avatar"
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:shadow-blue-300 transition-all"
                  />
                  <label
                    htmlFor="photoUpload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 shadow-md"
                  >
                    <Upload size={16} />
                  </label>
                  <input type="file" id="photoUpload" className="hidden" onChange={handlePhotoChange} />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-700">{formData.username}</h2>
                <p className="text-gray-500">{formData.status}</p>
              </div>

              {/* Profile Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <User className="text-blue-500" size={18} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <Mail className="text-blue-500" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <Phone className="text-blue-500" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <Globe className="text-blue-500" size={18} />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <MapPin className="text-blue-500" size={18} />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="User Status"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <CreditCard className="text-blue-500" size={18} />
                  <label className="text-gray-600 cursor-pointer hover:text-blue-500">
                    Upload ID Card
                    <input type="file" className="hidden" onChange={handleIdChange} />
                  </label>
                  {idCard && <span className="ml-2 text-sm text-green-600">{idCard.name}</span>}
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address Line"
                    className="w-full outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border-b pb-2 hover:border-blue-400 transition-all">
                  <input
                    type="text"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleInputChange}
                    placeholder="Post Code"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end mt-8">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-2"
                onClick={handleUpdate}
              >
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
