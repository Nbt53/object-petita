import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminButton from "../components/AdminButton";
import Submitting from "../components/Submitting";
import { splitTextIntoParagraphs } from "../../public/js/utils/textSplit";
import { getDocument } from "../../public/js/utils/getDocumentFromID";
import { portfolio } from "../../public/js/utils/portfolioFunctions";
import { useEffect } from "react";

export default function ImageView() {
    const location = useLocation();
    const docData = location.state;
    const [formTitle, setFormTitle] = useState(docData.name);
    // eslint-disable-next-line no-unused-vars
    const [formBody, setFormBody] = useState(docData.description);
    const [adminMode, setAdminMode] = useState(false);
    const [mainImage, setMainImage] = useState(docData.img[0]);
    const [loading, setLoading] = useState(false);
    const [textForTextarea, setTextForTextarea] = useState('');
    const [textWithParagraphs, setTextWithParagraphs] = useState([]);
    const navigate = useNavigate();
    const [documentId, setDocumentId] = useState(null);
    const [newImages, setNewImages] = useState(null);
    const [newImagesUrl, setNewImagesURL] = useState(null);

    useEffect(() => {
        const fetchDocument = async () => {
            const document = await getDocument("portfolio", docData.id);
            setDocumentId(document);
        };

        fetchDocument();
    }, [docData.id]);

    const handleTitleChange = (event) => {
        setFormTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        let text = event.target.value;
        setTextForTextarea(text);
        if (adminMode) {
            text = text.split('\n');
        }
        setFormBody(text);
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    useEffect(() => {
        const textWithParagraphs = splitTextIntoParagraphs(docData.description, 'imageView__body');
        setTextWithParagraphs(textWithParagraphs);
        setTextForTextarea(textWithParagraphs.map(paragraph => paragraph.props.children).join('\n'));
    }, []);

    return (
        <section className="screen-container">
            {loading ? <Submitting text="submitting" /> :

                <div className="imageView">
                    <AdminButton func={() => adminMode ? setAdminMode(false) : setAdminMode(true)} />
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
                                {portfolio.renderImages(docData, adminMode,
                                    setMainImage, documentId,
                                    newImages, setNewImages,
                                    newImagesUrl, setNewImagesURL)}
                                <textarea
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="imageView__body form-text-area"
                                    value={textForTextarea}
                                    onChange={handleBodyChange}
                                />
                            </div>
                            :
                            <>
                                <h3 className="imageView__title">{docData.name}</h3>
                                {portfolio.renderImages(docData, adminMode, setMainImage)}
                                {textWithParagraphs}
                                <p className="imageView__price">£{docData.price}</p>
                            </>
                        }
                        {adminMode ? <div className="imageView-admin">
                            <button className="button button-edit" onClick={() => portfolio.handleEdit(setLoading, docData, textForTextarea, formTitle, newImages, setNewImages)}>Edit</button>
                            <button className="button button-delete" onClick={() => portfolio.handleDelete(docData, navigate, setLoading)}>
                                Delete</button>
                        </div> : null}
                    </div>

                </div>
            }
        </section>
    )
}