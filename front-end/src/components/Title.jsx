
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
                    <a href="mailto:simgevurtok@gmail.com" target='blank' className="form-link">
                        <ion-icon name="mail-outline"></ion-icon>
                    </a>
                    <a href="https://www.instagram.com/objectpetita_ceramics" target='blank' className="form-link">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>

                </div>
            </div>

        </div>
    )
}