"use client";

import React from "react";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const TermsAndCondition = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Welcome to our platform. By accessing or using our website, you agree to comply with these Terms and Conditions. 
            Please read them carefully before using our services.
          </p>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using our services, you confirm that you have read, understood, and agreed to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Use of the Website</h2>
            <p>
              You agree not to use the site for any unlawful purposes or in violation of any applicable laws.
              Misuse of the website may result in termination of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Account Responsibility</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password.
              Any actions taken under your account are your responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Privacy Policy</h2>
            <p>
              Your use of the website is also governed by our{" "}
              <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these terms at any time. Updates will be posted on this page.
            </p>
          </section>

          <Separator />

          <p className="text-sm text-gray-500">
            Last updated: October 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndCondition;
