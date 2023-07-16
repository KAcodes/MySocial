"use client"
import { useAuthContext } from '@app/context/AuthContext';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const ProtectedRoute = ({children}) => {
    const { currentUser } = useAuthContext();
    const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser])

  return children;
}

export default ProtectedRoute