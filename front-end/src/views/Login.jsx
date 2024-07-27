import { NavLink } from "react-router-dom";
import {  signInWithGoogle } from "../config/Auth";


export default function Login() {
    const handleSignIn = async () => {
        await signInWithGoogle()
            .then(() => {

            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    };
    return (
        <div>
            <h1>Login</h1>
            <NavLink to="#" activeClassName='no-underline' onClick={handleSignIn}><ion-icon name="person-outline"></ion-icon></NavLink>

        </div>
    )
}