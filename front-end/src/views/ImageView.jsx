import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../config/Firebase";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import AdminButton from "../components/AdminButton";
import Submitting from "../components/Submitting";
import { splitTextIntoParagraphs } from "../../public/js/utils/textSplit";

export default function ImageView() {
    const location = useLocation();
    const docData = location.state;
    const [formTitle, setFormTitle] = useState(docData.name);
    const [formBody, setFormBody] = useState(docData.description);
    const [adminMode, setAdminMode] = useState(false);
    const [mainImage, setMainImage] = useState(docData.img[0]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setFormTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setFormBody(event.target.value);
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "portfolio"), where("id", "==", docData.id));
            const querySnapshot = await getDocs(q);
            await Promise.all(querySnapshot.docs.map((doc) => updateDoc(doc.ref, { name: formTitle, description: formBody })));
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async () => {
        try {
            const q = query(collection(db, "portfolio"), where("id", "==", docData.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            navigate('/portfolio');
        } catch (e) {
            console.log(e);
        }
    };

    const adminButton = () => {
        adminMode ? setAdminMode(false) : setAdminMode(true);
    }
    const textWithParagraphs = splitTextIntoParagraphs(docData.description, 'imageView__body');
    const renderImages = (docData) => {
        return (
            <div className="imageView__preview">
                {docData.img.map((image, index) => {
                    return (
                        <div key={index} className="imageView__thumbnail-container"
                            onClick={() => setMainImage(image)}
                        >
                            <img src={image} alt={docData.name} className="imageView__thumbnail" />
                        </div>

                    )
                })}
            </div>
        )
    }

    return (
        <section className="screen-container">
            {loading ? <Submitting text="submitting" /> :

                <div className="imageView">
                    <AdminButton func={adminButton} />
                    <img src={mainImage} alt={docData.name} className="imageView__image" />
                    <div className="imageView__content">
                        {adminMode ?
                            <div className="imageView__edit">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="imageView__title form-input"
                                    value={formTitle}
                                    onChange={handleTitleChange}
                                />
                                {renderImages(docData)}
                                <textarea
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="imageView__body form-text-area"
                                    value={formBody}
                                    onChange={handleBodyChange}
                                />
                            </div>
                            :
                            <>
                                <h3 className="imageView__title">{docData.name}</h3>
                                {renderImages(docData)}
                                {textWithParagraphs}
                            </>
                        }
                        {adminMode ? <div className="imageView-admin">
                            <button className="button button-edit" onClick={handleEdit}>Edit</button>
                            <button className="button button-delete" onClick={handleDelete}>Delete</button>                    </div> : null}
                    </div>

                </div>
            }
        </section>
    )
}