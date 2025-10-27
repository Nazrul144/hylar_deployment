"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

const sections = [
  {
    number: 1,
    title: "Acceptance of Terms",
    description:
      "By creating an account or using our services, you confirm that you have read, understood, and agreed to these terms.",
    color: "from-blue-500/20 to-blue-700/20",
  },
  {
    number: 2,
    title: "Use of the Website",
    description:
      "You agree not to use the site for any unlawful purposes or in violation of any applicable laws. Misuse of the website may result in termination of your account.",
    color: "from-green-500/20 to-green-700/20",
  },
  {
    number: 3,
    title: "Account Responsibility",
    description:
      "You are responsible for maintaining the confidentiality of your account and password. Any actions taken under your account are your responsibility.",
    color: "from-purple-500/20 to-purple-700/20",
  },
  {
    number: 4,
    title: "Privacy Policy",
    description: `Your use of the website is also governed by our <a href="/privacy" class="text-blue-600 underline hover:text-blue-800">Privacy Policy</a>.`,
    color: "from-rose-500/20 to-rose-700/20",
  },
  {
    number: 5,
    title: "Limitation of Liability",
    description:
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.",
    color: "from-yellow-500/20 to-yellow-700/20",
  },
  {
    number: 6,
    title: "Changes to Terms",
    description:
      "We reserve the right to update or modify these terms at any time. Updates will be posted on this page.",
    color: "from-gray-500/20 to-gray-700/20",
  },
];

const TermsAndCondition = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
      >
        Terms & Conditions
      </motion.h1>

      <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
        By accessing or using our website, you agree to comply with these Terms
        and Conditions. Please read them carefully before using our services.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader
                className={`p-6 bg-gradient-to-r ${section.color} rounded-t-2xl`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/80 text-gray-800 rounded-full font-bold">
                    {section.number}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent
                className="p-6 text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      <Separator className="my-10" />

      <p className="text-sm text-gray-500 text-center">
        Last updated: <span className="font-medium text-gray-700">October 2025</span>
      </p>
    </div>
  );
};

export default TermsAndCondition;
