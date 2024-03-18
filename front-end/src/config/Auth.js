import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./Firebase";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signOut = async (navigate) => {
    try {
        await auth.signOut();
        navigate('/');
    } catch (error) {
        console.log(error);
        throw error;
    }
};