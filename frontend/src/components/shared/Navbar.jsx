"use client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookmark } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { CategoriesContext } from "@/providers/CategoriesProvider";
import { BASE_URL } from "@/config/config";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { ModeToggle } from "../themeProvider/ModeToggle";
import { UserContext } from "@/providers/UserProvider";

// All routes and submenus here:
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
  const { user } = useContext(UserContext);
  const [photo, setPhoto] = useState("/profile.png");

  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);

 
  useEffect(() => {
    if (user && user.profile_picture) {
      const fullUrl = user.profile_picture.startsWith("http")
        ? user.profile_picture
        : `${BASE_URL}${user.profile_picture}`;
      setPhoto(`${fullUrl}?t=${Date.now()}`); 
    } else {
      setPhoto("/profile.png");
    }
  }, [user]);

  useEffect(() => {
    const handleScrolled = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  const handleCloseClick = () => setOpen(false);

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
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
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
                            variant={"ghost"}
                          >
                            {navItem.title}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={handleCloseClick}>
                          {categories.map((feature) => (
                            <DropdownMenuItem
                              key={feature.id}
                              className="dark:text-gray-100"
                            >
                              <Link href={`/category/${feature.id}`}>
                                {feature.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
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
              <NavigationMenuList className="gap-6">
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
                          variant={"ghost"}
                        >
                          {navItem.title}
                          <IoIosArrowDown className="mt-0.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {categories.map((category) => (
                          <DropdownMenuItem
                            key={category.id}
                            onClick={handleCloseClick}
                            className="dark:text-gray-100"
                          >
                            <Link href={`/category/${category.id}`}>
                              {category.category_name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
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
          </div>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-2">
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
                          className="dark:text-gray-100"
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
                  className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="common-text border-1 border-[#00308F] px-6 py-5 font-semibold text-lg dark:text-gray-100"
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
