"use client";

import { InfoIcon, RefreshCwIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
        Privacy Policy
      </h1>
      <p className="text-center text-gray-700 mb-4">
        Your privacy is important to us. This page explains how we handle your information when you use our website.
      </p>
      <Separator className="mb-6" />

      {/* Section 1 */}
      <Card className="bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex items-center space-x-3">
          <ShieldCheckIcon className="w-6 h-6 text-teal-600" />
          <CardTitle className="text-xl font-semibold">Information Collection</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          We may collect personal information like your name, email, and other details when you register or interact with our services.
        </CardContent>
      </Card>

      {/* Section 2 */}
      <Card className="bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex items-center space-x-3">
          <UsersIcon className="w-6 h-6 text-teal-600" />
          <CardTitle className="text-xl font-semibold">Use of Information</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          Your information is used to provide, improve, and personalize our services, and to communicate important updates.
        </CardContent>
      </Card>

      {/* Section 3 */}
      <Card className="bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex items-center space-x-3">
          <InfoIcon className="w-6 h-6 text-teal-600" />
          <CardTitle className="text-xl font-semibold">Data Sharing</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          We do not sell your personal information. We only share data with trusted partners when necessary to provide our services.
        </CardContent>
      </Card>

      {/* Section 4 */}
      <Card className="bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex items-center space-x-3">
          <RefreshCwIcon className="w-6 h-6 text-teal-600" />
          <CardTitle className="text-xl font-semibold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          Your use of the website is also governed by our Privacy Policy. Please read it carefully to understand how we handle your data.
        </CardContent>
      </Card>

      <Separator />
      <p className="text-sm text-gray-500 text-center">Last updated: October 2025</p>
    </div>
  );
};

export default Privacy;
