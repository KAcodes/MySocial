
"use client"

import { useEffect, useState } from "react";
import { signUp } from "../firebase/auth/login";
import { hideOutcome, showError, hideSuccess, showSuccess } from "../ui";
import Link from "next/link";
import Image from "next/image";


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

        const loginOutcome = document.querySelector('#loginOutcome')
        const loginSuccessMessage = document.querySelector('#loginSuccessMessage');
        const loginErrorMessage = document.querySelector('#lblLoginErrorMessage')

        hideOutcome()
    }, [])
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        const {result, error} = await signUp(email, password);
        
        //if unsuccessful
        if (error) {
            hideOutcome()
            showError(error)
        }

        if (result) {
            hideOutcome()
            showSuccess();
        }
        setEmail("");
        setPassword("");
        
       
    }

    return (
        
        <div id="login" className="flex ">
        <div id="login-pic" className="w-full relative hidden sm:block"><Image src="/assets/images/login-pic.jpg" alt="login pic of friends" fill style={{objectFit: "cover"}} />
        </div>
        <div id="login-form-side" className=" flex w-full bg-gray-100 h-screen place-items-center p-4">
            <form className="m-3 min-w-3/4 min-h-max mx-auto bg-white rounded-xl space-y-4 p-11 shadow-md place-content-center">
                <div className="flex-col space-y-4 min-w-1/2 mx-auto content-center">
                    <h1 className="text-4xl font-medium text-center">Create an account</h1>
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
                        <div id="loginOutcome" className="text-xs max-w-[85%]">
                            <div id="loginErrorMessage" className="text-red-600"></div>
                            <div id="loginSuccessMessage" className="text-green-500"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-sm space-x-6">
                        <button id="loginBtn" type="button" onClick={handleSignUp} className="blue_btn">Sign Up</button>
                    </div>
                    <p className="text-xs text-center ">Already have an account?<Link className="font-medium" href="/"> Sign in here!</Link></p>  
                </div>
            </form>
        </div>

{/* <div id="login" className="flex ">
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
        </div> */}

    </div>
        
        
        
      )
}

export default Page