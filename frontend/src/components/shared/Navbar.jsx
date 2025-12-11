// --- FULL NAVBAR CODE WITH FIXES ---

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
import { BookmarkContext } from "../../providers/BookmarkProvider";
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
  const { bookmarks } = useContext(BookmarkContext);
  const { user, setUser } = useContext(UserContext);
  const [photo, setPhoto] = useState("/profile.png");

  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

 useEffect(() => {
  console.log("🔔 Navbar: User changed", user);
  
  if (user && user.profile_picture) {
    const fullUrl = user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `${BASE_URL}${user.profile_picture}`;
    const photoWithTimestamp = `${fullUrl}?t=${Date.now()}`;
    setPhoto(photoWithTimestamp);
    console.log("📸 Navbar photo updated:", photoWithTimestamp);
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
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      const res = await fetch(`${BASE_URL}/api/accounts/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ refresh_token }),
      });

      const result = await res.json();

      if (res.ok || result.status_code === 200) {
        toast.success("You've been logged out successfully!");
      } else {
        toast.error(result?.detail || "Logout failed from server");
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={cn(
        "border-b px-4 md:px-6 sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md"
          : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 lg:px-16">
        <div className="flex items-center gap-2">
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
                  xmlns="http://www.w3.org/2000/svg"
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
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2 ">
                  {navItems.map((navItem) =>
                    navItem.title === "Discover Savings" ? (
                      <DropdownMenu 
                        key={navItem.title}
                        open={open}
                        onOpenChange={setOpen}
                      >
                        <DropdownMenuTrigger asChild >
                          <Button
                            className="text-gray-900 dark:text-gray-100"
                            variant="ghost"
                          >
                            {navItem.title}
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                          {loading ? (
                            <DropdownMenuItem disabled >
                              Loading...
                            </DropdownMenuItem>
                          ) : (
                            categories.map((feature) => (
                              <DropdownMenuItem
                                key={feature.id}
                                className="dark:text-gray-100 whitespace-nowrap cursor-pointer"
                                asChild
                              >
                                <Link href={`/category/${feature.id}`} className="w-full">
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
                              : "text-gray-900 dark:text-gray-100"
                          )}
                        >
                          {navItem.title}
                        </Link>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

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
              <NavigationMenuList
                className="gap-6 flex-nowrap"
              >
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
                              key={category.id}
                              onClick={handleCloseClick}
                              className="dark:text-gray-100 whitespace-nowrap cursor-pointer"
                              asChild
                            >
                              <Link href={`/category/${category.id}`} className="w-full">
                                {category.category_name}
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
                            ? "text-blue-800 underline font-bold dark:text-blue-400 "
                            : "text-gray-900 dark:text-gray-100",
                          "whitespace-nowrap"
                        )}
                      >
                        {navItem.title}
                      </Link>
                    </NavigationMenuItem>
                  )
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
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Link href={"/store_item"}>
                    <FaBookmark className="text-2xl text-blue-600 dark:text-blue-400" />
                  </Link>
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {bookmarks.length}
                  </span>
                </div>
              </div>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <div className="w-10 rounded-full">
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