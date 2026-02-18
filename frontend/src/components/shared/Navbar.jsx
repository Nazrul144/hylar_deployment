"use client";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { CategoriesContext } from "../../providers/CategoriesProvider";
import { BASE_URL } from "../../config/config";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { ModeToggle } from "../themeProvider/ModeToggle";
import { UserContext } from "../../providers/UserProvider";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import Swal from "sweetalert2";
import { WishlistContext } from "../../providers/WishlistContext";

const navItems = [
  { title: "Home", path: "/" },
  { title: "How It Works", path: "/work" },
  { title: "Discover Savings" },
  { title: "About Us", path: "/about" },
  { title: "Add Your Business", path: "/business" },
  { title: "FAQS", path: "/faqs" },
  { title: "Contact", path: "/contact" },
];

export default function Navbar({ montserrat }) {
  const [open, setOpen] = useState(false);
  const { categories, loading } = useContext(CategoriesContext);
  const { user, setUser } = useContext(UserContext);
  // ✅ Get live count directly from shared WishlistContext
  const { savedCount } = useContext(WishlistContext);
  const [photo, setPhoto] = useState("/profile.png");
  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && user.profile_picture) {
      const fullUrl = user.profile_picture.startsWith("http")
        ? user.profile_picture
        : `${BASE_URL}${user.profile_picture}`;
      setPhoto(`${fullUrl}?t=${Date.now()}`);
    } else {
      setPhoto("/profile.png");
    }
  }, [user, user?.profile_picture, user?.first_name, user?.last_name]);

  useEffect(() => {
    const handleScrolled = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  const handleCloseClick = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access && refresh && refresh !== "undefined" && refresh !== "null") {
        try {
          const res = await fetch(`${BASE_URL}/api/accounts/logout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ refresh_token: refresh }),
          });

          const result = await res.json();

          if (res.ok && result.statusCode === 200) {
            Swal.fire({
              title: "Logged Out",
              text: "You have been logged out successfully.",
              icon: "success",
            });
          } else {
            toast.success("Logged out successfully!");
          }
        } catch (apiError) {
          toast.success("Logged out successfully!");
        }
      } else {
        toast.success("Logged out successfully!");
      }
    } catch (error) {
      toast.success("Logged out successfully!");
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");
      sessionStorage.clear();
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <header
      className={cn(
        "border-b px-4 md:px-6 sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md"
          : "bg-white dark:bg-gray-900",
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 lg:px-16">
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navItems.map((navItem) =>
                    navItem.title === "Discover Savings" ? (
                      <DropdownMenu
                        key={navItem.title}
                        open={open}
                        onOpenChange={setOpen}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="text-gray-900 dark:text-gray-100"
                            variant="ghost"
                          >
                            {navItem.title}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          {loading ? (
                            <DropdownMenuItem disabled>
                              Loading...
                            </DropdownMenuItem>
                          ) : (
                            categories.map((feature) => (
                              <DropdownMenuItem
                                key={feature.slug}
                                className="dark:text-gray-100 whitespace-nowrap cursor-pointer"
                                asChild
                              >
                                <Link
                                  href={`/category/${feature.slug}`}
                                  className="w-full"
                                >
                                  {feature.name}
                                </Link>
                              </DropdownMenuItem>
                            ))
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <NavigationMenuItem key={navItem.path}>
                        <Link
                          href={navItem.path}
                          className={cn(
                            pathName === navItem.path
                              ? "text-blue-800 underline font-bold dark:text-blue-400"
                              : "text-gray-900 dark:text-gray-100",
                          )}
                        >
                          {navItem.title}
                        </Link>
                      </NavigationMenuItem>
                    ),
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + desktop nav */}
          <div className="flex items-center gap-6">
            <Link href={"/"} className="text-3xl font-bold italic">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={50}
                height={50}
                className="lg:mr-24"
              />
            </Link>

            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-6 flex-nowrap">
                {navItems.map((navItem) =>
                  navItem.title === "Discover Savings" ? (
                    <DropdownMenu
                      key={navItem.title}
                      open={open}
                      onOpenChange={setOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="text-gray-900 dark:text-gray-100 whitespace-nowrap"
                          variant={"ghost"}
                        >
                          {navItem.title}
                          <IoIosArrowDown className="mt-0.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <DropdownMenuItem disabled>
                            Loading...
                            <div className="flex justify-center items-center">
                              <Spinner className={cn("size-8 animate-spin")} />
                            </div>
                          </DropdownMenuItem>
                        ) : (
                          categories.map((category) => (
                            <DropdownMenuItem
                              key={category.slug}
                              onClick={handleCloseClick}
                              className="dark:text-gray-100 whitespace-nowrap cursor-pointer"
                              asChild
                            >
                              <Link
                                href={`/category/${category.slug}`}
                                className="w-full"
                              >
                                {category.name}
                              </Link>
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <NavigationMenuItem key={navItem.path}>
                      <Link
                        href={navItem.path}
                        className={cn(
                          pathName === navItem.path
                            ? "text-blue-800 underline font-bold dark:text-blue-400"
                            : "text-gray-900 dark:text-gray-100",
                          "whitespace-nowrap",
                        )}
                      >
                        {navItem.title}
                      </Link>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* RIGHT PART */}
        <div>
          {user ? (
            <div className="flex items-center gap-8">
              <ModeToggle />

              {/* ✅ Badge reads directly from WishlistContext — always in sync */}
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Link href={"/store_item"}>
                    <FaBookmark className="text-2xl text-blue-600 dark:text-blue-400" />
                  </Link>
                  {savedCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {savedCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          src={photo}
                          width={40}
                          height={40}
                          alt="Profile Picture"
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-500 shadow-md cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="dark:text-gray-300 dark:bg-gray-900"
                      >
                        <p>
                          {user.first_name} {user.last_name}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 dark:text-gray-300 dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between dark:text-gray-100"
                    >
                      <Link href="/profile">Profile</Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between dark:text-gray-100"
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="common-text border-1 border-[#00308F] px-6 py-5 font-semibold text-lg dark:text-white dark:bg-gray-300"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="font-semibold common-bg px-6 py-5 text-lg dark:text-gray-100"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
