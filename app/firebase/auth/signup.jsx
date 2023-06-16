import app from "../config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";
import router from "next/router";


const auth = getAuth(app);

export async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result.user)
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };

}