"use client"

import { useEffect, useState } from "react";
import { signIn } from "./firebase/auth/login";
import { hideError, showError, hideSuccess, clearEmailAndPassword } from "./ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "./context/AuthContext"; 


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
        <div className="login-pic w-1/2">Whatsup</div>
        <div id="login-form w-1/2 flex-column">
            <form className="">
                <h1>Sign in to your account</h1>
                <p>Don't have an account? <Link href="/signup">Sign up here!</Link></p>
                <div>
                    <input id="txtEmail" type="email" placeholder="Enter Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label>Email</label>
                </div>
                <div>
                    <input id="txtPassword" type="password" placeholder="Enter Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <label>Password</label>
                </div>
                <div id="loginError">
                    <div id="loginErrorMessage">Error message</div> 
                </div>
                <div id="loginSuccess">
                    <div id="loginSuccessMessage"></div> 
                </div>
                <button id="loginBtn" type="button" onClick={handleSignIn}>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Page