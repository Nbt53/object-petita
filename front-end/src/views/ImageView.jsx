import { useLocation } from "react-router-dom";

export default function ImageView() {
    const location = useLocation();
    const docData = location.state;

    return (
        <section className="screen-container">
            <div className="image-view">
                <img src={docData.img} alt={docData.name} className="image-view__image" />
                <div className="image-view__text">
                    <h1>{docData.name}</h1>
                    <p>{docData.description}</p>
                    <p>{docData.price}</p>
                </div>
            </div>
        </section>
    )
}