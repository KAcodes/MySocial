"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@app/context/AuthContext";
import Tester from "@components/Tester";
import FriendSidebar from "@components/FriendSidebar";

const Home = ({}) => {

  const { currentUser } = useAuthContext();
  const router = useRouter();
  

  /* useEffect(() => {
    
    if (!currentUser) {
      return router.push("/");
  }
  }, [currentUser]) */
  
  return (
    <section className="w-full flex-center flex-col bg-slate-100">
        <h1>My Social Home Page</h1>
        <h3>User Id = {currentUser && currentUser.uid}</h3>
        <div className="w-full flex">
          <FriendSidebar />
          <Tester />
        </div>
    </section>
  )
}

export default Home

