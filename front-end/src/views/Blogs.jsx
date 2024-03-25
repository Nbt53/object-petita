import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../public/js/checkAdmin';
import ViewTitle from '../components/ViewTitle';
import { auth } from '../config/Auth';

export default function Blogs() {
    const [admin] = useAdmin(auth);
    const navigate = useNavigate()

    const newBlog = () => {
        console.log('new blog');
    }

    const viewBlog = () => {
        navigate('/blogView');
    }


    return (
        <div className="screen-container">
            {admin ? <div className="portfolio-admin" onClick={newBlog}> </div> : null}
            <div className="blog">
                <ViewTitle title="interviews" />

                <div className="blog-container" onClick={viewBlog}>
                    <div className="blog-image">
                        <img src="./images/about.png" alt="blog" className="blog-image__img" />
                    </div>
                    <div className="blog-text">
                        <h3 className="blog-text__title">I asked a puppet stupid questions...</h3>
                        <p className="blog-text__content mb-medium">Welcome to the object petita Ceramic Studio blog! Here, we delve into the world of ceramics, art, and mental health. Join us on a journey of introspection, as we explore the transformative power of art in shaping our mental well-being. Our blogs offer insights, reflections, and stories that celebrate the intersection of art and psychology. Discover the stories behind our creations, the inspiration that drives our work, and the impact of ceramics on our mental health. Explore the world of object petita Ceramic Studio through our blogs, and embark on a journey of self-discovery through art.</p>

                    </div>

                </div>


                <div className="blog-container">
                    <div className="blog-image">
                        <img src="./images/about.png" alt="blog" className="blog-image__img" />
                    </div>
                    <div className="blog-text">
                        <h3 className="blog-text__title">I asked a puppet stupid questions...</h3>
                        <p className="blog-text__content">Welcome to the object petita Ceramic Studio blog! Here, we delve into the world of ceramics, art, and mental health. Join us on a journey of introspection, as we explore the transformative power of art in shaping our mental well-being. Our blogs offer insights, reflections, and stories that celebrate the intersection of art and psychology. Discover the stories behind our creations, the inspiration that drives our work, and the impact of ceramics on our mental health. Explore the world of object petita Ceramic Studio through our blogs, and embark on a journey of self-discovery through art.</p>

                    </div>

                </div>


                <div className="blog-container">
                    <div className="blog-image">
                        <img src="./images/about.png" alt="blog" className="blog-image__img" />
                    </div>
                    <div className="blog-text">
                        <h3 className="blog-text__title">I asked a puppet stupid questions...</h3>
                        <p className="blog-text__content">Welcome to the object petita Ceramic Studio blog! Here, we delve into the world of ceramics, art, and mental health. Join us on a journey of introspection, as we explore the transformative power of art in shaping our mental well-being. Our blogs offer insights, reflections, and stories that celebrate the intersection of art and psychology. Discover the stories behind our creations, the inspiration that drives our work, and the impact of ceramics on our mental health. Explore the world of object petita Ceramic Studio through our blogs, and embark on a journey of self-discovery through art.</p>
                    </div>
                </div>
            </div>


        </div>
    )
}