import { useState } from "react";
import { auth, signOut } from "../config/Auth"
import ViewTitle from "../components/ViewTitle";
import { deleteUser, onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../config/Firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function User() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState('')
    if (!auth.currentUser) {
        navigate('/');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            if (currentUser) {
                setFormValues({
                    firstName: currentUser.displayName.split(' ')[0] || '',
                    lastName: currentUser.displayName.split(' ')[1] || '',
                    email: currentUser.email || '',
                });
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userName = `${formValues.firstName} ${formValues.lastName}`

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: userName,
            }).then(() => {
                setDoc(userDoc, { firstName: formValues.firstName, lastName: formValues.lastName }, { merge: true });
            }).catch((error) => {
                console.error(error);
            });

        }
    }
    const handleDeleteAccount = async () => {
        if (auth.currentUser) {
            const confirmDelete = window.prompt('Please type DELETE to confirm that you want to delete your account. This action cannot be undone.');
            if (confirmDelete === 'DELETE') {
                await deleteUser(auth.currentUser).then(() => {
                    deleteDoc(userDoc)
                    navigate('/');
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    return (
        <>

            <section className="screen-container">
                <div className="form-container">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-info">
                            <ViewTitle title="Your Details" />
                        </div>

                        <input onChange={handleChange} type="text" id="firstName" name="firstName" placeholder="First Name" className="form-input" value={formValues.firstName} required />
                        <input onChange={handleChange} type="text" id="lastName" name="lastName" placeholder="Last Name" className="form-input" value={formValues.lastName} required />
                        <input onChange={handleChange} type="email" id="email" name="email" placeholder="E-mail" className="form-input" value={formValues.email} required disabled />

                        <div className="form-submit">
                            <input type="submit" value="Save" className="form-button" />
                        </div>
                    </form>
                </div>

                <div className="form-button__container">
                    <button value="Delete Profile" className="form-button form-button-delete" onClick={handleDeleteAccount} >Delete Account </button>
                    <button value="Sign Out" className="form-button form-button-signOut" onClick={() => signOut(navigate)} >Sign Out </button>
                </div>

            </section>
        </>
    )
}