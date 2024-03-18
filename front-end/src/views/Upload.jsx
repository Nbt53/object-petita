import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../config/Firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Upload() {
    const [formValues, setFormValues] = useState({
        name: '',
        img: '',
        price: '',
        date: '',
        description: '',
        category: '',
        imagePath: '',
        inShop: false,
    });

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
        const fileInput = document.getElementById('img');
        const file = fileInput.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imgURL = await getDownloadURL(storageRef);
        const updatedFormValues = { ...formValues, img: imgURL, imagePath: storageRef.fullPath };
        setFormValues(updatedFormValues);
        try {
            const docRef = await addDoc(collection(db, 'portfolio'), updatedFormValues)
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
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
                    <input onChange={handleChange} type="checkbox" id="inShop" name="inShop" placeholder="In Shop" className="form-input" value={formValues.inShop} required />
                    <textarea onChange={handleChange} id="description" name="description" placeholder="description" className="form-textarea" value={formValues.description} required></textarea>
                    <div className="form-submit">
                        <input type="submit" value="Submit" className="form-button" />
                    </div>

                </form>
            </section>
        </div>
    )
}