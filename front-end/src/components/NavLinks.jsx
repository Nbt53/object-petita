import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithGoogle, auth } from "../config/Auth";

export function NavLinks() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleSignIn = () => {
        signInWithGoogle()
            .then(() => {

            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    };
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        // Cleanup subscription on unmount
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
                    <NavLink to="#" activeClassName='no-underline' onClick={handleSignOut}>Sign Out</NavLink>
                    : <NavLink to="#" activeClassName='no-underline' onClick={handleSignIn}>Sign In with Google</NavLink>}
                {currentUser ? <p className="nav-top-divider"> | </p> : ''}
                {currentUser ? <NavLink to="/user" className="nav-top__link">User</NavLink> : null}
            </div>

        </div>
    );
}

export default NavLinks;