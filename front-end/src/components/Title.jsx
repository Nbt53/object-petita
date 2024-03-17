
import NavLinks from "./NavLinks";

export default function Title() {

    return (
        <div className="header">
            <div className="header-container">

                <div className="header-title__container">
                    <h1 className="header-title mb-small" >Object Petit a</h1></div>
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