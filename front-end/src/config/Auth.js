import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./Firebase";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        await setDoc(doc(db, 'users', user.uid), {
            admin: false,
            firstName: user.displayName.split(' ')[0] || '',
            lastName: user.displayName.split(' ')[1] || '',
            email: user.email,
        });

        return { user, token };
    } catch (error) {
        console.log(error);
        throw error;
    }
};