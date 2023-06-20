"use client"

import { useEffect, useState } from "react";
import { signIn } from "./firebase/auth/login";
import { hideError, showError, hideSuccess, clearEmailAndPassword } from "./ui";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import Image from "next/image";


const Page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const txtEmail = document.querySelector('#txtEmail')
        const txtPassword = document.querySelector('#txtPassword')

        const btnLogin = document.querySelector('#loginBtn')
        const signupBtn = document.querySelector('#signupBtn')


        const btnLogout = document.querySelector('#btnLogout')

        const divAuthState = document.querySelector('#divAuthState')
        const lblAuthState = document.querySelector('#lblAuthState')

        const loginSuccess = document.querySelector('#loginSuccess')
        const loginSuccessMessage = document.querySelector('#loginSuccessMessage');

        const loginError = document.querySelector('#loginError')
        const loginErrorMessage = document.querySelector('#lblLoginErrorMessage')

        hideError();
        hideSuccess();
    }, [])
    

    const handleSignIn = async (e) => {
        e.preventDefault();

       
         const {result, error} = await signIn(email, password);
        if (error) {
            showError(error)
        }
        if (result) {
            router.replace("/homepage")
        } 
    }


  return (
    <div id="login" className="flex ">
        <div id="login-pic" className="w-full relative hidden sm:block"><Image src="/assets/images/login-pic.jpg" alt="login pic of friends" fill style={{objectFit: "cover"}} />
        </div>
        <div id="login-form-side" className=" flex w-full bg-gray-100 h-screen place-items-center p-4">
            <form className=" h-4/6 m-3 min-w-3/4 mx-auto bg-white rounded-xl space-y-4 p-11 shadow-md">
                <div className="flex-col space-y-4 min-w-1/2 mx-auto">
                <h1 className="text-4xl font-medium text-center">Sign in </h1>
                <div className="max-w-max min-w-max mx-auto p-2 space-y-3">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input id="txtEmail" type="email" placeholder="Enter Email Address" onChange={(e) => {setEmail(e.target.value)}}
                        className="border rounded shadow py-1 px-3 bg-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input id="txtPassword" type="password" placeholder="Enter Password" onChange={(e) => {setPassword(e.target.value)}} 
                        className="border rounded shadow py-1 px-3 bg-white text-sm" />
                        
                    </div>
                    <div id="loginError">
                        <div id="loginErrorMessage">Error message</div> 
                    </div>
                    <div id="loginSuccess">
                        <div id="loginSuccessMessage"></div> 
                    </div>
                </div>
                <p className="text-xs text-center ">New to MySocial? <Link className="font-medium" href="/signup">Sign up here!</Link></p>
                <div className="flex items-center justify-center max-[1000px]:flex-col text-sm space-x-6">
                    <button id="loginBtn" type="button" onClick={handleSignIn} className="blue_btn">Log in</button>
                    <Link href="/">Forgot Password?</Link>
                </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Page