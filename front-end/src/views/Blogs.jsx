import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AllContext } from '../../context/AllContext';
import BlogPreview from '../components/BlogPreview';
import AdminButton from '../components/AdminButton';

export default function Blogs() {

    const { blogs } = useContext(AllContext);
    const navigate = useNavigate()

    const newBlog = () => {
        navigate('/blogCreate');
    }
    const viewBlog = (slug) => {
        navigate(`/blogView/${slug}`);
    }
    const renderPreviews = () => {
        return blogs.map((blog) => {
            return <BlogPreview key={blog.id} blog={blog} viewBlog={viewBlog} />
        })
    }

    return (
        <div className="screen-container">
            <AdminButton func={newBlog} />
            <div className="blog">
                {renderPreviews()}
            </div>


        </div>
    )
}