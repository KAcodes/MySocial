
"use client"

import { useEffect, useState } from "react";
import { signUp } from "../firebase/auth/login";
import { hideError, showError, hideSuccess, showSuccess } from "../ui";
import Link from "next/link";


const Page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const {result, error} = await signUp(email, password);
        
        //if unsuccessful
        if (error) {
            hideSuccess()
            showError(error)
        }

        if (result) {
            hideError()
            showSuccess();
        }
        setEmail("");
        setPassword("");
       
    }

    return (
        <div id="login" className="flex ">
            <div id="login-pic" className="w-1/2">Login Pic</div>
            <div id="login-form" className="w-1/2 flex-column">
                <form className="">
                    <h1>Create an account</h1>
                    <p>Already have an account? <Link href="/">Sign In</Link></p>
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
                    <button id="signupBtn" type="button" onClick={handleSignUp}>Sign up</button>
                </form>
            </div>
        </div>
      )
}

export default Page