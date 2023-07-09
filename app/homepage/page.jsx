"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@app/context/AuthContext";
import PostSection from "@components/PostSection";
import FriendSidebar from "@components/FriendSidebar";

const Home = ({}) => {

  const { currentUser } = useAuthContext();
  const router = useRouter();
  

 /*  useEffect(() => {
    
    if (!currentUser) {
      return router.push("/");
  }
  }, [currentUser])  */
  
  return (
    <section className="w-full flex-center flex-col bg-slate-100">
        <div className="w-full flex">
          <FriendSidebar/>
          <PostSection/>
        </div>
    </section>
  )
}

export default Home

