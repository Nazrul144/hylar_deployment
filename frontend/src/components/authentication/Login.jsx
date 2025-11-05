"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must not exceed 32 characters" })
    .regex(/[A-Z]/, { message: "At least one uppercase letter" })
    .regex(/[a-z]/, { message: "At least one lowercase letter" })
    .regex(/[0-9]/, { message: "At least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "At least one special character" }),
});

const Login = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://cestoid-uncoarsely-kayla.ngrok-free.dev/api/accounts/login",
        {
          // 👉 এখানে তোমার backend URL বসাও
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // form data পাঠানো হচ্ছে
        }
      );

      const result = await res.json();
      ("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="lg:flex md:flex mt-12 justify-center mx-auto gap-6 bg-white w-[820px] p-2 shadow-2xl">
        {/* Image div */}
        <motion.div
          className="relative h-[600px] w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/login.JPG"
            alt="Login_Image"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 grid place-items-center ml-14">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg">
              Welcome To MaximumSavings
              <hr className="border-t-1 border-[#7BB662] w-66 mt-2" />
            </h1>
          </div>

          <h4 className="text-white absolute bottom-4 text-sm left-12">
            Log in to your <span className="font-bold">MaximumSavings</span>{" "}
            account.
          </h4>

          <div className="absolute inset-0 rounded-lg bg-black/30" />
        </motion.div>

        {/* Login form */}
        <motion.div
          className="h-[600px] w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-full max-w-md p-8 space-y-3 text-gray-100 h-full">
            <h1 className="montserrat-text text-center common-text text-5xl font-bold mb-10">
              Login
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="relative">
                          <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                            Email
                          </Label>
                          <Input
                            {...field}
                            className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="relative">
                          <Label className="absolute -top-2 left-3 bg-white px-1 text-sm text-blue-600">
                            Password
                          </Label>
                          <Input
                            type="password"
                            {...field}
                            className="rounded-md border border-blue-400 focus:border-blue-500 focus:ring-0 text-black"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href={"/createpass"}
                    className="text-blue-500 mt-2 italic lg:ml-50 underline"
                  >
                    Forgot Pawwrod
                  </Link>
                </div>

                <Button className="w-full bg-blue-900 text-white" type="submit">
                  Login
                </Button>
              </form>
              f
            </Form>

            <p className="text-xs text-center sm:px-6 text-gray-800">
              Don't have an account?
              <Link
                href={"/register"}
                className="underline font-bold montserrat-text common-text"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
