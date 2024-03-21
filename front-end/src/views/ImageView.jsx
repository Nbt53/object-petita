import { useLocation } from "react-router-dom";
import { useAdmin } from "../../public/js/checkAdmin";
import { auth } from "../config/Auth";
import { useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

export default function ImageView() {
    const location = useLocation();
    const docData = location.state;
    const [admin] = useAdmin(auth);
    const [formTitle, setFormTitle] = useState(docData.name);
    const [formBody, setFormBody] = useState(docData.description);
    const [adminMode, setAdminMode] = useState(false);

    const handleTitleChange = (event) => {
        setFormTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setFormBody(event.target.value);
    };

    const handleEdit = async () => {
        try {
            const q = query(collection(db, "portfolio"), where("id", "==", docData.id));
            const querySnapshot = await getDocs(q);
            await Promise.all(querySnapshot.docs.map((doc) => updateDoc(doc.ref, { name: formTitle, description: formBody })));
        } catch (e) {
            console.log(e);
        }
    };

    const adminButton = () => {
        adminMode ? setAdminMode(false) : setAdminMode(true);
    }


    return (
        <section className="screen-container">

            <div className="image-view">
                {admin ? <div className="portfolio-admin">
                    <button onClick={adminButton} className="nav-top__link portfolio-admin__text">+</button>
                </div> : null}
                <img src={docData.img} alt={docData.name} className="image-view__image" />
                <div className="image-view__text">
                    {adminMode ?
                        <>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="image-view__title form-input"
                                value={formTitle}
                                onChange={handleTitleChange}
                            />
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                className="image-view__body form-text-area"
                                value={formBody}
                                onChange={handleBodyChange}
                            />
                        </>
                        :
                        <>
                            <h3 className="image-view__title">{docData.name}</h3>
                            <p className="image-view__body">{docData.description}</p>
                        </>
                    }
                    {adminMode ? <div className="image-view-admin">
                        <button className="button button-edit" onClick={handleEdit}>Edit</button>
                        <button className="button button-delete">Delete</button>
                    </div> : null}
                </div>

            </div>
        </section>
    )
}