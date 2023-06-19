import app from "../config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

export async function signUp(email, password) {
    let result, error = null;
    
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error }; 
}

export async function signIn(email, password) {
    

    let result, error = null
        
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result.user)
    } catch (e) {
        error = e;
    }
    return { result, error }; 
}

 export async function logout() {

    console.log("user is signed out")
    return await signOut(auth);
} 

