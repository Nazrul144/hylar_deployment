import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <motion.div
      className="mt-16 max-w-5xl mx-auto px-2"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.4,
        startOffset: 70,
        duration: 1,
        type: "keyframes",
      }}
    >
      <h1 className="text-xl lg:text-4xl inter-text font-semibold text-center common-text mb-8">
        Frequently asked questions
      </h1>
      <div className="space-y-4">
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium common-text">What is Mobbin?</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo consequuntur
            distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              How often do you update the library?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            We regularly update our product library to ensure you have access to
            the latest deals and offerings. New products, discounts, and
            exclusive offers are added on a continuous basis throughout the
            week. Our team works diligently to keep the MaxSavings library fresh
            and up-to-date, so you'll always discover new ways to save.
            Additionally, we refresh seasonal promotions and featured deals to
            align with current trends and shopping events. We recommend checking
            back frequently or subscribing to our newsletter to stay informed
            about the newest additions to our collection.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">Can I get a free trial?</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Yes, we offer a free trial period so you can experience the benefits
            of MaxSavings before committing to a subscription. During your
            trial, you'll have access to our full range of features, including
            exclusive deals, special discounts, and premium product offerings.
            Simply sign up on our website to start your free trial—no credit
            card required upfront. Once your trial period ends, you can choose
            to continue with one of our subscription plans to keep enjoying all
            the perks and savings that MaxSavings has to offer.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">Do you have a monthly plan?</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Yes, we offer flexible monthly subscription plans designed to fit
            your needs. With our monthly plan, you can enjoy full access to
            exclusive deals, premium discounts, and special offers without any
            long-term commitment. You can easily subscribe, manage, or cancel
            your plan anytime through your account settings. Choose the monthly
            option for maximum flexibility while still getting the best savings
            on MaxSavings.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              Do you have discounts for students and educators?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Yes, we offer special discounts for students and educators as part
            of our commitment to making savings accessible to everyone. If
            you're a student or educator, you can享受 reduced subscription rates
            when you verify your status during signup. Simply provide valid
            proof of enrollment or employment in an educational institution, and
            you'll unlock exclusive pricing on our subscription plans. This is
            our way of supporting those in the education community while helping
            you save even more on MaxSavings.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              What forms of payment do you accept?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            We accept a variety of payment methods to make your subscription
            process as convenient as possible. You can pay using major credit
            cards including Visa, Mastercard, American Express, and Discover. We
            also accept debit cards and popular digital payment platforms such
            as PayPal and Google Pay. All transactions are processed securely
            through encrypted payment gateways to protect your financial
            information. Simply choose your preferred payment method at checkout
            and start enjoying the benefits of MaxSavings.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              How do I switch from a Pro plan to a Team plan?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Switching from a Pro plan to a Team plan is quick and easy. Simply
            log in to your MaxSavings account and navigate to your subscription
            settings or account management page. From there, select the option
            to upgrade or change your plan, then choose the Team plan that best
            suits your needs. Your billing will be automatically adjusted, and
            you'll have immediate access to all the Team plan features. If you
            need any assistance during the process, our customer support team is
            available to help guide you through the transition.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              What is the difference between Enterprise plan and Team plan?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            The Team plan is ideal for small groups and families, offering
            shared access and collaborative features at an affordable price. The
            Enterprise plan is designed for larger organizations, providing
            everything in the Team plan plus dedicated account management,
            priority support, unlimited users, advanced security, custom
            billing, and detailed analytics. Contact our sales team to discuss
            which plan best fits your needs.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">What is your refund policy?</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            We offer a hassle-free refund policy to ensure your satisfaction. If
            you're not completely happy with your MaxSavings subscription, you
            can request a full refund within 30 days of your purchase. Simply
            contact our customer support team with your account details, and
            we'll process your refund promptly—no questions asked. Please note
            that refunds are only available for the current billing cycle and
            may take 5-7 business days to appear in your account. We're
            committed to making sure you have a risk-free experience with
            MaxSavings.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">
              Can I cancel my subscription?
            </h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block size-5 shrink-0 group-open:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden size-5 shrink-0 group-open:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900 dark:text-gray-300">
            Yes, you can cancel your subscription at any time with no hassle.
            Simply log in to your MaxSavings account, go to your subscription
            settings, and select the cancel option. Your subscription will
            remain active until the end of your current billing period, so you
            can continue enjoying all the benefits you've paid for. Once
            canceled, you won't be charged for the next cycle. If you change
            your mind, you can easily reactivate your subscription anytime. For
            assistance with cancellation, our customer support team is always
            ready to help.
          </p>
        </details>
      </div>
      <h1 className="text-center text-sm text-[#747474] mt-6 mb-6">
        Still have more questions? Find answers in our help center.
        <Link className="underline font-bold text-[#151515] dark:text-gray-300" href={"/contact"}>
          help center
        </Link>
      </h1>
      <motion.div
        className="flex justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <Link
          href={"/submit_form"}
          className="common-bg text-white text-lg py-2 px-4 rounded-sm montserrat-text font-semibold hover:scale-105 transition-all duration-300"
        >
          Click Here To Submit Your Offer
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Faq;
