import { auth } from "../config/Auth"
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../public/js/checkAdmin";
import { AllContext } from "../../context/AllContext";
import { useContext } from "react";

export default function Portfolio() {

    const navigate = useNavigate()
    const [admin] = useAdmin(auth);
    const { portfolioData } = useContext(AllContext);
    const handlePress = (docData) => {
        try {
            navigate('/ImageView', { state: docData });
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
            {admin ? <div className="portfolio-admin" onClick={uploadNavigate}>

            </div> : null}
            <div className="portfolio">

                {renderPhotos()}
            </div>
        </section>
    )
}
