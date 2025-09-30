"use client";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleNaviagteToProducts = () => router.push("/products");
  const handleNavigateToHome = () => router.push("/");
  const handleNavigateToAbout = () => router.push("/about");
  const handleNavigateToContact = () => router.push("/contact");
  return (
    <header className="py-5 sm:px-10 px-2 flex justify-between shadow">
      <div
        className="logo text-lg font-semibold cursor-pointer"
        onClick={handleNavigateToHome}
      >
        Logo
      </div>
      <div className="routes hidden sm:flex gap-2 sm:gap-10 ">
        <button
          className="Blog cursor-pointer"
          onClick={handleNaviagteToProducts}
        >
          Products
        </button>
        <button
          className="about cursor-pointer"
          onClick={handleNavigateToAbout}
        >
          About
        </button>
        <button
          className="contact cursor-pointer"
          onClick={handleNavigateToContact}
        >
          Contact
        </button>
      </div>
      <div className="menu sm:hidden">
        <div className="btn  flex justify-end">
          <button className="btn" onClick={toggleDropdown}>
            {showDropdown ? <X /> : <Menu />}
          </button>
        </div>
        <div className="tabs w-full">
          {showDropdown && (
            <div className="routes mt-5 flex flex-col gap-2 sm:gap-10 items-center justify-center">
              <button
                className="Blog cursor-pointer"
                onClick={handleNaviagteToProducts}
              >
                Products
              </button>
              <button
                className="about cursor-pointer"
                onClick={handleNavigateToAbout}
              >
                About
              </button>
              <button
                className="contact cursor-pointer"
                onClick={handleNavigateToContact}
              >
                Contact
              </button>
              <button className="login">Login</button>
            </div>
          )}
        </div>
      </div>

      <div className="logo hidden sm:block">Login</div>
    </header>
  );
}

export default Header;
