import { Route, Routes } from "react-router-dom";
import Home from '../views/Home';
import Portfolio from '../views/Portfolio';
import About from '../views/About';
import Contact from '../views/Contact';
import User from '../views/User';
import Upload from "../views/Upload";
import ImageView from "../views/ImageView";
import Blogs from "../views/Blogs";
import BlogView from "../views/BlogView";
import BlogCreate from "../views/BlogCreate";

export function Navigator() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/object" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ImageView" element={<ImageView />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/" element={<Portfolio />} />
            <Route path="/blogView" element={<BlogView />} />
            <Route path="/blogCreate" element={<BlogCreate />} />
        </Routes>
    );
}

export default Navigator;