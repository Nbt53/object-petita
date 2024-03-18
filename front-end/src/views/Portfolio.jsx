import { auth } from "../config/Auth"
import { NavLink } from "react-router-dom";
import { useAdmin } from "../../public/js/checkAdmin";

export default function Portfolio() {
    const [admin] = useAdmin(auth);

    return (
        <section className="screen-container">
            <div className="portfolio">

                {admin ? <div className="portfolio-admin">
                    <NavLink to="/upload" className="nav-top__link">+</NavLink>
                </div>
                    : null}


            </div>
        </section>
    )
}
