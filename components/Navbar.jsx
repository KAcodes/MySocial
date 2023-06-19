"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { logout } from "@app/firebase/auth/login";
import { useAuthContext } from "@app/context/AuthContext";



const Navbar = () => {

    const [toggleDropdown, setToggleDropdown] = useState(false)

    const handleLogout = async() => {
        try {
            await logout()
            setToggleDropdown(false);
        } catch (e) {
            console.log(e);
        }
    }

  return (

    
    <nav className="flex-between w-full mb-1 pt-3">
        
        <Link href="/homepage" className="flex flex-center gap-3 float-left">
            <Image
            src="/assets/images/bali3.jpg"
            width={37}
            height={37}
            alt="Profile Logo"
            className="object-contain"/>
            <p className="logo_text">MySocial</p>
        </Link>
        <div className="md:flex  hidden ">
            <div className="flex gap-5 ">
                    <Link href="/homepage/messages">Messages</Link>
                    <Link href="/homepage/shop">Shop</Link>
                    <Link href="/homepage/settings">Settings</Link>
                    <button 
                    type="button"
                    onClick={handleLogout} 
                    >Sign Out
                    </button> 
            </div>
        </div>

        {/* mobiie nav */}
        <div className="">
                <div className="">
                    <p onClick={() => {setToggleDropdown((prev) => !prev)}}
                    className="outline-btn">MS</p>
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/homepage/messages"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Messages</Link>
                            <Link href="/homepage/shop"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Shop</Link>
                            <Link href="/homepage/settings"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Settings</Link>
                            <button className="black_btn"
                            onClick={handleLogout}>Sign Out</button>
                        </div>
                    )}
                </div>
        </div>
        
    </nav>
  )
}

export default Navbar