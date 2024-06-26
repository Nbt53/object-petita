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
import Login from "../views/Login";

export function Navigator() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/object" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ImageView/:slug" element={<ImageView />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/" element={<Portfolio />} />
            <Route path="/blogView/:slug" element={<BlogView />} />
            <Route path="/blogCreate" element={<BlogCreate />} />
            <Route path="/admin514" element={<Login />} />
        </Routes>
    );
}

export default Navigator;