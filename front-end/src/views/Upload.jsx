import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../config/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAdmin } from "../../public/js/checkAdmin";
import { auth } from "../config/Auth";

export default function Upload() {
    const [admin, loading] = useAdmin(auth);
    const defaultFormValues = {
        name: '',
        img: '',
        price: '',
        date: '',
        description: '',
        category: '',
        imagePath: '',
        id: '',
        inShop: false,
    }
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    if (loading) return (<div>Loading...</div>);

    if (!admin || !auth.currentUser) {
        return (
            <div>
                <section className="screen-container">
                    <h1>Not authorized</h1>
                </section>
            </div>
        )
    }

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeFile = (event) => {
        setFormValues({
            ...formValues,
            img: event.target.files[0].name
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const fileInput = document.getElementById('img');
        const file = fileInput.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imgURL = await getDownloadURL(storageRef);
        const id = Math.random().toString(36).substring(7);
        const updatedFormValues = { ...formValues, img: imgURL, imagePath: storageRef.fullPath, id: id };
        setFormValues(updatedFormValues);
        try {
            await addDoc(collection(db, 'portfolio'), updatedFormValues)
            setFormValues(defaultFormValues);
            setSubmitted(true);
            setSubmitting(false);
        } catch (e) {
            console.error('Error adding document: ', e);
            setSubmitting(false);
        }
    }

    const handleAnother = () => {
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <div>
                <section className="screen-container">
                    <h1>Submitted</h1>
                    <button className="form-button" onClick={handleAnother}>Submit another?</button>
                </section>
            </div>
        )
    }

    return (
        <div>
            <section className="screen-container">

                <form className="form" onSubmit={handleSubmit}>
                    <input onChange={handleChange} type="text" id="name" name="name" placeholder="Name" className="form-input" value={formValues.name} required />
                    <input onChange={handleChangeFile} type="file" id="img" name="img" placeholder="Image" className="form-input" required />
                    <input onChange={handleChange} type="text" id="category" name="category" placeholder="Category" className="form-input" value={formValues.category} required />
                    <input onChange={handleChange} type="date" id="date" name="date" placeholder="Date" className="form-input" value={formValues.date} required />
                    <input onChange={handleChange} type="number" id="price" name="price" placeholder="Price" className="form-input" value={formValues.price} required />
                    <input onChange={handleChange} type="checkbox" id="inShop" name="inShop" placeholder="In Shop" className="form-input" value={formValues.inShop} />
                    <textarea onChange={handleChange} id="description" name="description" placeholder="description" className="form-textarea" value={formValues.description} required></textarea>
                    <div className="form-submit">
                        <input type="submit" value="Submit" className="form-button" disabled={submitting} />
                    </div>

                </form>
            </section>
        </div>
    )
}