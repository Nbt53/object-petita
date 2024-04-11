export default function BlogPreview({ blog, viewBlog }) {

    return (
        <div className="blog__preview-container">
            <div className=" blog__preview-image">
                <img src={blog.image.url} alt="blog" className=" blog__preview-img" />
            </div>
            <div className="blog-content">
                <h3 className="blog__title blog__preview-title"
                    onClick={() => viewBlog(blog.slug)}>
                    {blog.title}
                </h3>
                <p className="blog__text blog__preview-text mb-medium">{blog.intro}</p>

            </div>

        </div>
    )
}