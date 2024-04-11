import { useAdmin } from "../../public/js/checkAdmin";
import { auth } from "../config/Auth";

export default function AdminButton({func}) {
    const [admin] = useAdmin(auth);
    return (
        admin ? <div className="portfolio-admin" onClick={func}> </div> : null
    )
}