"use client"

import { useState } from "react";
import { signUp, signIn } from "./firebase/auth/signup";

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

console.log(document.getElementById("login"))
console.log(document.getElementById("divLoginError"))
  return (
    <div id="login" className="flex ">
        <div className="login-pic w-1/2">Whatsup</div>
        <div id="login-form w-1/2 flex-column">
            <form className="">
                <div>
                    <input id="txtEmail" type="email" placeholder="Enter Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label>Email</label>
                </div>
                <div>
                    <input id="txtPassword" type="password" placeholder="Enter Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <label>Password</label>
                </div>
                <div id="divLoginError">
                    <div id="lblLoginErrorMessage">Error message</div> 
                </div>
                <button id="btnLogin" type="button">Log in</button>
                <button id="btnSignup" type="button" onClick={() => signUp(email, password)}>Sign up</button>
            </form>
        </div>
    </div>
  )
}

export default LogIn