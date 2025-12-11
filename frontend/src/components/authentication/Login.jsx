"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { BASE_URL } from "../../config/config";
import toast from "react-hot-toast";

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

  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (data) => {
    const res = await fetch(`${BASE_URL}/api/accounts/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status_code === 400 || result.status === "failed") {
      toast.error("Invalid email or password.");
      return;
    }

    if (result.status_code === 200 || result.status === 202) {
      toast.success(`Welcome back, ${result.data.first_name || "User"}!`);
      form.reset();
      const userInfo = {
        email: result.data.email,
        first_name: result.data.first_name,
        last_name: result.data.last_name,
      };
      // Save in localStorage
      localStorage.setItem("access_token", result.data.access_token);
      localStorage.setItem("refresh_token", result.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(userInfo));

      setUser(userInfo);

      router.push("/");
    } else {
      toast.error(result?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="lg:flex md:flex justify-center mx-auto gap-6 bg-white dark:bg-gray-800 w-full max-w-[820px] p-2 shadow-2xl dark:shadow-gray-900/50 rounded-lg transition-colors duration-200">
        {/* Image div */}
        <motion.div
          className="relative h-[600px] w-full lg:w-96 rounded-lg overflow-hidden"
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

          <div className="absolute inset-0 grid place-items-center px-6">
            <h1 className="z-10 text-3xl font-bold text-white drop-shadow-lg text-center">
              Welcome To MaximumSavings
              <hr className="border-t-2 border-[#7BB662] w-full mt-2" />
            </h1>
          </div>

          <h4 className="text-white absolute bottom-4 text-sm left-6 lg:left-12">
            Log in to your <span className="font-bold">MaximumSavings</span>{" "}
            account.
          </h4>

          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Login form */}
        <motion.div
          className="h-[600px] w-full lg:w-96"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-full max-w-md p-8 space-y-3 h-full">
            <h1 className="montserrat-text text-center text-gray-900 dark:text-gray-100 text-5xl font-bold mb-10 transition-colors duration-200">
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
                          <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            Email
                          </Label>
                          <Input
                            {...field}
                            className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                            placeholder="your@email.com"
                          />
                        </div>
                        <FormMessage className="text-red-500 dark:text-red-400" />
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
                          <Label className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-1 text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            Password
                          </Label>
                          <Input
                            type="password"
                            {...field}
                            className="rounded-md border border-blue-400 dark:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                            placeholder="••••••••"
                          />
                        </div>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Link
                    href={"/forgotpass"}
                    className="text-blue-600 dark:text-blue-400 mt-2 italic underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 inline-block"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  className="w-full bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors duration-200"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Form>

            <p className="text-xs text-center text-gray-800 dark:text-gray-300 transition-colors duration-200">
              Don't have an account?{" "}
              <Link
                href={"/register"}
                className="underline font-bold montserrat-text text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
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