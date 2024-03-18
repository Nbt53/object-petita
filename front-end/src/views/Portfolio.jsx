import { useEffect, useState } from "react";
import { auth } from "../config/Auth"
import { NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function Portfolio() {
    const [user, setUser] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if(String(currentUser.uid) === '1MQtQTnFN4ZMgnUJZzyidWagRlh1') {
                setUser(currentUser);
                console.log(currentUser.uid)
            }
        });

        // Return the unsubscribe function to be called on component unmount
        return unsubscribe;
    }, []);



    return (
        <section className="screen-container">
            <div className="portfolio">
                {user ? <NavLink to="/upload" className="nav-top__link">+</NavLink> : 'false'}
            </div>
        </section>
    )
}
