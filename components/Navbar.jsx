"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { logout } from "@app/firebase/auth/login";
import { useRouter } from "next/navigation";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@app/firebase/firestore/getData";
import { useAuthContext } from "@app/context/AuthContext";
import fetchPosts from "@hooks/fetchPosts";

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  const { profPic } = fetchPosts();

  const handleLogout = async () => {
    try {
      await logout();
      setToggleDropdown(false);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="flex-between w-full mb-1 pt-3">
      <Link
        href="/dashboard/homepage"
        className="flex flex-center gap-3 ml-4"
      >
        <img
          src={profPic}
          alt="Profile Logo"
          className="h-10 w-10 rounded-full"
        />
        <p className="logo_text hover:text-blue-400">MySocial</p>
      </Link>
      <div className="md:flex hidden">
        <div className="flex gap-5 ">
          <Link href="/dashboard/messages" className="hover:text-blue-400">
            Messages
          </Link>
          <Link href="/dashboard/shop" className="hover:text-blue-400">
            Shop
          </Link>
          <Link href="/dashboard/settings" className="hover:text-blue-400">
            Settings
          </Link>
          <button
            type="button"
            className="hover:text-blue-400"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* mobiie nav */}
      <div className="mr-3">
          <button
            onClick={() => {
              setToggleDropdown((prev) => !prev);
            }}
            className=" border-solid border-y-gray-950 font-semibold"
          >
            MS
          </button>
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/dashboard/messages"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Messages
              </Link>
              <Link
                href="/dashboard/shop"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Shop
              </Link>
              <Link
                href="/dashboard/settings"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Settings
              </Link>
              <button className="blue_btn" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          )}
        
      </div>
    </nav>
  );
};

export default Navbar;
