"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@app/context/AuthContext"
import Posts from "@components/Posts";
import Tester from "@components/Tester";

const Home = ({}) => {

  const { currentUser } = useAuthContext();
  const router = useRouter();
  

  useEffect(() => {
    
    if (!currentUser) {
      return router.push("/");
  }
  }, [currentUser])
  
  return (
    <section className="w-full flex-center flex-col">
        <h1>My Social Home Page</h1>
        <h1 >User email = {currentUser && currentUser.email}</h1>
        <h3>User Id = {currentUser && currentUser.uid}</h3>
        <Tester/>
        <Posts/>
    </section>
  )
}

export default Home

