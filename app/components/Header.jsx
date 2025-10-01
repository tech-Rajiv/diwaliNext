"use client";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import DialogBox from "./DialogBox";
import { toast } from "sonner";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleNaviagteToProducts = () => router.push("/products");
  const handleNavigateToHome = () => router.push("/");
  const handleNavigateToGuide = () => router.push("/guide");
  const handleNavigateToAddProducts = () => router.push("/addproducts");
  const handelNavigateToLogin = () => router.push("/auth/login");
  const handelLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error();
      }
      dispatch(logout());
      router.push("/");
      toast.success("Logout successfull");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const loginOrNotUi = isLoggedIn ? (
    <div className="flex gap-1 cursor-pointer">
      <DialogBox
        name={"logout"}
        heading={"Logout"}
        content={"Do you really want to log out?"}
        onClickYesFn={handelLogout}
        loading={loading}
      />{" "}
      <LogOut size={22} />
    </div>
  ) : (
    <button
      className="flex gap-1 cursor-pointer"
      onClick={handelNavigateToLogin}
    >
      Login <LogIn size={22} />
    </button>
  );
  return (
    <header className="shadow py-5">
      <div className="nav sm:px-10 px-5 flex justify-between">
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
            className="contact cursor-pointer"
            onClick={handleNavigateToAddProducts}
          >
            AddProduct
          </button>
          <button
            className="about cursor-pointer"
            onClick={handleNavigateToGuide}
          >
            Guide
          </button>
        </div>
        <div className="IconOrBtn">
          <div className="iocnMenu sm:hidden">
            <div className="btn  flex justify-end">
              <button className="btn" onClick={toggleDropdown}>
                {showDropdown ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          <div className="logBtn hidden sm:flex">{loginOrNotUi}</div>
        </div>
      </div>
      <div className="menu sm:hidden">
        {showDropdown && (
          <div className="routes flex flex-col items-start justify-center px-5 mt-5 gap-2">
            <button
              className="Blog cursor-pointer"
              onClick={handleNaviagteToProducts}
            >
              Products
            </button>
            <button
              className="contact cursor-pointer"
              onClick={handleNavigateToAddProducts}
            >
              AddProduct
            </button>
            <button
              className="about cursor-pointer"
              onClick={handleNavigateToGuide}
            >
              Guide
            </button>
            {loginOrNotUi}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
