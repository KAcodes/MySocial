"use client"

import "@styles/globals.css"
import Navbar from "@components/Navbar"
import ProtectedRoute from "@components/ProtectedRoute"


export const metadata = {
    title: "Social Media Page",
    description: "Make your own social media page"
}

const Layout = ({ children }) => {

  return (
            <ProtectedRoute>
                <Navbar/>
                {children}
            </ProtectedRoute>
  )
}

export default Layout