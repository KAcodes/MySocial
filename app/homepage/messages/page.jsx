"use client"

import React from 'react'
import { useAuthContext } from '@app/context/AuthContext';

const Messages = () => {
  const {currentUser} = useAuthContext();
  return (
    <section className="w-full flex-center flex-col">
        <h1>My messages</h1>
        <h1 >User email = {currentUser && currentUser.email}</h1>
        <h3>User Id = {currentUser && currentUser.uid}</h3>
    </section>
  )
}

export default Messages