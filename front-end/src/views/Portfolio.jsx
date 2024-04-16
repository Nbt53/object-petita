import { useNavigate } from "react-router-dom";
import { AllContext } from "../../context/AllContext";
import { useContext } from "react";
import AdminButton from "../components/AdminButton";

export default function Portfolio() {

    const navigate = useNavigate()

    const { portfolioData } = useContext(AllContext);

    const handlePress = (docData) => {
        try {
            navigate(`/ImageView/${docData.slug}`, { state: docData });
        } catch (e) {
            console.error('Error navigating to ImageView: ', e);
        }

    }


    const renderPhotos = () => {
        if (Array.isArray(portfolioData)) {
            return portfolioData.map((item, index) => {
                const docId = Object.keys(item)[0];
                const docData = item[docId];

                return (
                    <div className="portfolio-container" key={index} onClick={() => handlePress(docData)}>
                        <img src={docData.img} alt={docData.name} className="portfolio-image" />
                    </div>

                )
            });
        }
    }
    const uploadNavigate = () => {
        navigate('/upload');
    }
    return (
        <section className="screen-container">
            <AdminButton func={uploadNavigate} />
            <div className="portfolio">

                {renderPhotos()}
            </div>
        </section>
    )
}
