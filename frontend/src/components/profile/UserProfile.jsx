'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { User, MapPin, Globe, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { BASE_URL } from '@/config/config';
import { UserUpdate } from '../ui/userUpdate';

const UserProfile = () => {
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    country: '',
    employer: '',
    employment_status: '',
    id_card_front: '',
    id_card_back: '',
    job_details: '',
    postcode: '',
    profile_picture: null,
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfileData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/profiles/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const userData = await res.json();
        setFormData(userData.data);
        setPhoto(userData.data.profile_picture || null);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfileData();
  }, []);

  return (
    <div className="flex justify-center items-center  bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl "
      >
        <Card className="shadow-xl rounded-2xl bg-white p-24">
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={photo ? (typeof photo === 'string' ? photo : '/profile.png') : '/profile.png'}
                    width={144}
                    height={144}
                    alt="Profile Picture"
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                  {formData.first_name} {formData.last_name}
                </h2>
              </div>

              {/* Profile Info */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: MapPin, value: 'address_line1', label: 'Address Line 1' },
                  { icon: MapPin, value: 'address_line2', label: 'Address Line 2' },
                  { icon: Globe, value: 'city', label: 'City' },
                  { icon: Globe, value: 'country', label: 'Country' },
                  { icon: User, value: 'employer', label: 'Employer' },
                  { icon: User, value: 'employment_status', label: 'Employment Status' },
                  { icon: CreditCard, value: 'id_card_front', label: 'ID Card Front' },
                  { icon: CreditCard, value: 'id_card_back', label: 'ID Card Back' },
                  { icon: User, value: 'job_details', label: 'Job Details' },
                  { icon: MapPin, value: 'postcode', label: 'Postcode' },
                ].map((field) => (
                  <div key={field.value} className="flex items-center gap-2 border-b pb-2">
                    <field.icon className="text-blue-500" size={18} />
                    <input
                      type="text"
                      value={formData[field.value] || ''}
                      readOnly
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Update Button (non-functional for now) */}
            <div className="flex justify-end mt-8">
              <Button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600">
                Update User
                <UserUpdate/>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
