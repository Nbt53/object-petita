
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";

export default function Title() {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/");
    }
    return (
        <div className="header">
            <div className="header-container">

                <div className="header-title__container">
                    <h1 className="header-title mb-small" onClick={handleHome} >Object Petit a</h1></div>
                <NavLinks />

                <div className="socials-wrapper">
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                </div>
            </div>

        </div>
    )
}