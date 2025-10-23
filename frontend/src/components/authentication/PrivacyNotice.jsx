"use client";

import {
  CookieIcon,
  CreditCardIcon,
  InfoIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const sections = [
  {
    title: "Information We Collect",
    icon: <UsersIcon className="w-6 h-6 text-blue-500" />,
    description:
      "We may collect personal information such as your name, email address, phone number, and other data you provide when you register or use our services.",
    color: "bg-blue-50",
  },
  {
    title: "How We Use Your Information",
    icon: <InfoIcon className="w-6 h-6 text-green-500" />,
    description:
      "Your information is used to provide, maintain, and improve our services, communicate with you about updates, and ensure a personalized user experience.",
    color: "bg-green-50",
  },
  {
    title: "Data Sharing",
    icon: <CreditCardIcon className="w-6 h-6 text-red-500" />,
    description:
      "We do not sell your personal information. We may share your data with trusted partners only when necessary to provide the services.",
    color: "bg-red-50",
  },
  {
    title: "Security of Your Information",
    icon: <ShieldCheckIcon className="w-6 h-6 text-purple-500" />,
    description:
      "We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.",
    color: "bg-purple-50",
  },
  {
    title: "Cookies and Tracking",
    icon: <CookieIcon className="w-6 h-6 text-yellow-500" />,
    description:
      "We use cookies and similar technologies to enhance your experience. You can manage cookies through your browser settings.",
    color: "bg-yellow-50",
  },
  {
    title: "Your Rights",
    icon: <UserIcon className="w-6 h-6 text-indigo-500" />,
    description:
      "You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at " +
      "<Link href='/contact' class='text-blue-600 underline'>Contact Us</Link>.",
    color: "bg-indigo-50",
  },
  {
    title: "Changes to This Privacy Notice",
    icon: <RefreshCwIcon className="w-6 h-6 text-gray-500" />,
    description:
      "We may update this Privacy Notice from time to time. All updates will be posted on this page with the 'Last Updated' date.",
    color: "bg-gray-50",
  },
];

const PrivacyNotice = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-600 via-teal-400 to-blue-600 bg-clip-text text-transparent">
  Privacy Notice
</h1>


      <p className="text-center text-gray-700 mb-4">
        Your privacy is important to us. This page explains how we collect, use,
        and protect your personal information.
      </p>
      <Separator className="mb-6" />

      {sections.map((section, idx) => (
        <Card
          key={idx}
          className={`hover:shadow-lg transition-shadow duration-300 ${section.color}`}
        >
          <CardHeader className="flex items-center space-x-3">
            {section.icon}
            <CardTitle className="text-xl font-semibold">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </Card>
      ))}

      <Separator />
      <p className="text-sm text-gray-500 text-center">
        Last updated: October 2025
      </p>
    </div>
  );
};

export default PrivacyNotice;
