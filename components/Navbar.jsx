"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Navbar = () => {

    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);

    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setAllProviders = async() => {
            const response = await getProviders();
            setProviders(response)
        }
        setAllProviders();
    }, [])
  return (

    
    <nav className="flex-between w-full mb-1 pt-3">
        
        <Link href="/" className="flex flex-center gap-3 float-left">
            <Image
            src="/assets/images/bali3.jpg"
            width={37}
            height={37}
            alt="Profile Logo"
            className="object-contain"/>
            <p className="logo_text">MySocial</p>
        </Link>
        <div className="md:flex  hidden ">
            {isUserLoggedIn ? (
                <div className="flex gap-5 ">
                    <Link href="/messages">Messages</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/settings">Settings</Link>
                        <button 
                        type="button" 
                        >Sign Out
                        </button>
                    
                </div>
            ) : (
                <div>
                    {providers && Object.values(providers).map(provider => (
                        <button
                        type="button"
                        key={provider.name}
                        onClick={() => {signIn}}
                        className="outline_btn"
                        >
                            Sign In
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* mobiie nav */}
        <div className="">
            {isUserLoggedIn ?  
                <div className="">
                    <p onClick={() => {setToggleDropdown((prev) => !prev)}}
                    className="outline-btn">MS</p>
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/messages"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Messages</Link>
                            <Link href="/shop"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Shop</Link>
                            <Link href="/settings"
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}>Settings</Link>
                            <button className="black_btn"
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                                }}>Sign Out</button>
                        </div>
                    )}
                </div> 
            
            :
            <>
                {providers && Object.values(providers).map(provider => (
                    <button
                    type="button"
                    key={provider.name}
                    onClick={() => {signIn}}
                    className="outline_btn"
                    >
                        Sign In
                    </button>
                ))}
            </>
            } 
           
        </div>
        
    </nav>
  )
}

export default Navbar