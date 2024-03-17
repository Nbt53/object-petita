import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithGoogle, auth } from "./Auth";
import { useEffect, useState } from "react";

function Navigator({ renderView, setCurrentView, currentView }) {
    const [currentUser, setCurrentUser] = useState(null);

    const handleViewChange = (view) => {
        setCurrentView(view);
        renderView(view);
        localStorage.setItem('currentView', view);
    };


    const handleSignIn = () => {
        signInWithGoogle()
            .then(({ user, token }) => {

            })
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    };
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
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
            <>
                <div className="nav-top">
                    <button onClick={() => handleViewChange('home')} className={`nav-top__link ${currentView === 'home' ? 'active' : ''}`}>Home</button>
                    <button onClick={() => handleViewChange('portfolio')} className={`nav-top__link ${currentView === 'portfolio' ? 'active' : ''}`}>Portfolio</button>
                    <button onClick={() => handleViewChange('about')} className={`nav-top__link ${currentView === 'about' ? 'active' : ''}`}>About</button>
                    <button onClick={() => handleViewChange('contact')} className={`nav-top__link ${currentView === 'contact' ? 'active' : ''}`}>Contact</button>
                    {currentUser ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In with Google</button>}
                    {currentUser ? <button onClick={() => handleViewChange('user')} className={`nav-top__link ${currentView === 'admin' ? 'active' : ''}`}>User</button> : null}
                </div>

            </>
        );
    }

    export default Navigator;