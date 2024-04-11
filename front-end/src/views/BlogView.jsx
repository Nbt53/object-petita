import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllContext } from "../../context/AllContext";
import Submitting from "../components/Submitting";
import AdminButton from "../components/AdminButton";
import RenderBlog from "../components/RenderBlog";
import EditBlog from "../components/EditBlog";

export default function BlogView() {
    const { slug } = useParams();
    const { blogs } = useContext(AllContext);
    const [blog, setBlog] = useState(null);
    const [editMode, setEditMode] = useState(false); // Add this line

    useEffect(() => {
        const blog = blogs.find(blog => blog.slug === slug);
        setBlog(blog);
    }, [blogs, slug]);

    const toggleEditMode = () => { // Add this function
        setEditMode(prevEditMode => !prevEditMode);
    };

    return (
        <div className="screen-container">
            <AdminButton func={toggleEditMode} /> {/* Update this line */}
            {!blog ? <Submitting text={'loading'} /> :
                (editMode ? <EditBlog blog={blog} /> : <RenderBlog blog={blog} />)
            }
        </div>
    );
}