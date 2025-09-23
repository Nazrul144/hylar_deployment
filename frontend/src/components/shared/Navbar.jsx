"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import { FaBookmark } from "react-icons/fa6";

// All routes and submenus here:
const navItems = [
  { title: "Home", path: "/" },
  { title: "How It Works", path: "/work" },
  {
    title: "Discover Savings",
    items: [
      { title: "Fashion", path: "/fashion" },
      { title: "Travels", path: "/travel" },
      { title: "Home & Lifestyle", path: "/lifestyle" },
      { title: "Finance", path: "/finance" },
    ],
  },
  { title: "About Us", path: "/about" },
  { title: "Add Your Business", path: "/business" },
  { title: "FAQS", path: "/faqs" },
];

export default function Navbar({ montserrat }) {
  const pathName = usePathname();

  const user = true;

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-4 lg:px-16">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
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
                {/* For Mobile Device */}
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem
                      key={index}
                      montserrat={montserrat.className}
                    >
                      {item.items ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <NavigationMenuTrigger
                              className={`${cn(montserrat)}`}
                            >
                              {item.title}
                            </NavigationMenuTrigger>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2">
                            <NavigationMenuList className="flex flex-col">
                              {item.items.map((submenu, subIndex) => (
                                <NavigationMenuItem key={subIndex}>
                                  <Link href={submenu.path} key={submenu.path}>
                                    {submenu.title}
                                  </Link>
                                </NavigationMenuItem>
                              ))}
                            </NavigationMenuList>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Link
                          className={`${cn(montserrat)} ${item.path === pathName ? "text-[#00308F] font-bold underline" : ""}`}
                          href={item.path}
                          key={item.path}
                        >
                          {item.title}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link href={"/"} className="text-3xl font-bold italic">
              Logo
            </Link>

            {/* Navigation menu */}
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-6">
                {navItems.map((item, index) => (
                  <NavigationMenuItem
                    key={index}
                    montserrat={montserrat.className}
                  >
                    {item.items ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <NavigationMenuTrigger
                            className={`${cn(montserrat)}`}
                          >
                            {item.title}
                          </NavigationMenuTrigger>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2">
                          <NavigationMenuList className="flex flex-col">
                            {item.items.map((submenu, subIndex) => (
                              <NavigationMenuItem key={subIndex}>
                                <Link href={submenu.path} key={submenu.path}>
                                  {submenu.title}
                                </Link>
                              </NavigationMenuItem>
                            ))}
                          </NavigationMenuList>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Link
                        className={`${cn(montserrat)} ${item.path === pathName ? "text-[#00308F] font-bold underline" : ""}`}
                        href={item.path}
                        key={item.path}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              {/*bookmark icon and user name div*/}
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <FaBookmark className="text-2xl text-blue-600 cursor-pointer" />

                  {/* Badge (static example with 3) */}
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    5
                  </span>
                </div>

                <div className="hidden md:block font-medium text-gray-700">
                  User Name
                </div>
              </div>

              {/*Profile div*/}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <div className="w-10 rounded-full">
                    <RxAvatar className="text-4xl cursor-pointer hover:bg-gray-100 rounded-full" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between"
                    >
                      <Link href="#">Profile</Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between"
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
                className="common-text border-1 border-[#00308F] px-6 py-5 font-semibold text-lg"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="font-semibold common-bg px-6 py-5 text-lg"
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
