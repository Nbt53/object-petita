import { Route, Routes } from "react-router-dom";
import Home from '../views/Home';
import Portfolio from '../views/Portfolio';
import About from '../views/About';
import Contact from '../views/Contact';
import User from '../views/User';
import Upload from "../views/Upload";
import ImageView from "../views/ImageView";

export function Navigator() {
    return (
        <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ImageView" element={<ImageView />} />
        </Routes>
    );
}

export default Navigator;