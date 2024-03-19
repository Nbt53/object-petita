import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {  auth, signInWithGoogle } from "../config/Auth";
import SignInForm from "./SignInForm";

export function NavLinks() {
    const [currentUser, setCurrentUser] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);

   
    const handleSignIn = async () => {
       await signInWithGoogle()
            .then(() => {

            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="nav-top">
            <div className="nav-top-links">
                <NavLink to="/" className="nav-top__link">Home</NavLink>
                <NavLink to="/portfolio" className="nav-top__link">Portfolio</NavLink>
                <NavLink to="/about" className="nav-top__link">About</NavLink>
                <NavLink to="/contact" className="nav-top__link">Contact</NavLink>
            </div>

            <div className="nav-top-users">
                {currentUser ?
                    <NavLink to="/user" activeClassName='no-underline' ><ion-icon name="person"></ion-icon></NavLink>
                    : <NavLink to="#" activeClassName='no-underline' onClick={handleSignIn}><ion-icon name="person-outline"></ion-icon></NavLink>}

            </div>
            {showSignIn ? <SignInForm setShowSignIn={setShowSignIn} /> : null}
        </div>
    );
}

export default NavLinks;