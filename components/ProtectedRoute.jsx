"use client";
import { useAuthContext } from "@app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [currentUser, router]);

  return authorized && children;
};

export default ProtectedRoute;
