import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../config/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAdmin } from "../../public/js/checkAdmin";
import { auth } from "../config/Auth";
import Submitting from "../components/Submitting";
import Submitted from "../components/Sumbitted";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { slugValidation } from "../../public/js/utils/slugValidation";


export default function Upload() {
    const [admin, loading] = useAdmin(auth);
    const [slugError, setSlugError] = useState('');
    const { blogSlugs, portfolioSlugs } = useContext(AllContext);
    const defaultFormValues = {
        name: '',
        img: [],
        price: '',
        date: '',
        description: '',
        category: '',
        imagePath: [],
        id: '',
        inShop: false,
        onSale: false,
        promoted: false,
        soldOut: false,
        slug: ''
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
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (event.target.name === 'slug') {
            setSlugError(slugValidation(value, blogSlugs, portfolioSlugs));
        }
        setFormValues({
            ...formValues,
            [event.target.name]: value
        });

    };

    const handleChangeFile = (event) => {
        const fileNames = Array.from(event.target.files).map(file => file.name);
        setFormValues({
            ...formValues,
            img: fileNames
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const fileInput = document.getElementById('img');
        const files = Array.from(fileInput.files);
        const imgURLs = [];
        const imagePaths = [];

        for (const file of files) {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const imgURL = await getDownloadURL(storageRef);
            imgURLs.push(imgURL);
            imagePaths.push(storageRef.fullPath);
        }

        const id = Math.random().toString(36).substring(7);
        const paragraphs = formValues.description.split('\n');
        const updatedFormValues = { ...formValues, img: imgURLs, imagePath: imagePaths, id: id, description: paragraphs };
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

    return (
        <>
            <section className="screen-container">
                {submitting ? (
                    <Submitting text={'submitting'} />
                ) : null}

                {submitted ? (
                    <Submitted setSubmitted={setSubmitted} />
                ) : null}

                {!submitting && !submitted ? (
                    <form className="form form-upload" onSubmit={handleSubmit}>
                        <input onChange={handleChange} type="text" id="name" name="name" placeholder="Name" className="form-input mb-medium" value={formValues.name} required />
                        <input onChange={handleChange} type="text" id="slug" name="slug" placeholder="slug for URL (must be unique)" className="form-input mb-medium" value={formValues.slug} required />
                        <p className="form-error">{slugError}</p>
                        <input onChange={handleChangeFile} type="file" id="img" name="img" placeholder="Image" className="form-input mb-medium" multiple required />
                        <input onChange={handleChange} type="text" id="category" name="category" placeholder="Category" className="form-input mb-medium" value={formValues.category} required />
                        <input onChange={handleChange} type="date" id="date" name="date" placeholder="Date" className="form-input mb-medium" value={formValues.date} required />
                        <input onChange={handleChange} type="number" id="price" name="price" placeholder="Price" className="form-input mb-medium" value={formValues.price} required />
                        <label htmlFor="inShop">In Shop</label>
                        <input onChange={handleChange} type="checkbox" id="inShop" name="inShop" className="form-input mb-medium" value={formValues.inShop} />
                        <label htmlFor="onSale">On Sale</label>
                        <input onChange={handleChange} type="checkbox" id="onSale" name="onSale" className="form-input mb-medium" value={formValues.onSale} />
                        <label htmlFor="promoted">Promoted</label>
                        <input onChange={handleChange} type="checkbox" id="promoted" name="promoted" className="form-input mb-medium" value={formValues.promoted} />
                        <textarea onChange={handleChange} id="description" name="description" placeholder="description" className="form-textarea" value={formValues.description} required></textarea>
                        <div className="form-submit">
                            <input type="submit" value="Submit" className="button" disabled={slugError} />
                        </div>

                    </form>
                ) : null}
            </section>
        </>
    )
}