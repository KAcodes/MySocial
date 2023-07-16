"use client"

import { useAuthContext } from '@app/context/AuthContext';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const Page = () => {

    const { currentUser } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
        router.push("/login");
        }
    }, [])

    return router.push("/dashboard/homepage")
}

        


export default Page