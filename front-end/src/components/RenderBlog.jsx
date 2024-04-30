export default function RenderBlog({ blog }) {
    const renderParagraphs = (text, className) => {
        if (Array.isArray(text)) {
            return text.map((paragraph, index) => (
                <p key={index} className={className}>{paragraph}</p>
            ));
        } else {
            return <p className={className}>{text}</p>;
        }
    }

    const renderInterview = () => {
        console.log(blog)
        return blog.content.interview.map((interview, index) => {
            return (
                <div key={index} className="blog__interview mb-small">
                    {renderParagraphs(interview.question, "blog__question mb-small")}
                    {renderParagraphs(interview.answer, "blog__answer mb-small")}
                </div>
            )
        })
    }

    return (
        <div className="blog">
            <div className="blog-container">
                <div className="blog-image">
                    <img src={blog.image.url} alt="blog" className="blog-image__img" />
                </div>
                <div className="blog-content">
                    <h3 className="blog__title">{blog.title}</h3>
                    <p className="blog__date mb-medium"> April 10th 2024</p>
                    {renderParagraphs(blog.intro, "blog__text")}
                    <p className="blog__date">{blog.date}</p>
                    {blog.video.url ?
                        <video src={blog.video.url} className="blog-video mb-medium" controls ></video> : null
                    }

                    {renderInterview()}
                    {renderParagraphs(blog.outro, "blog__outro")}
                </div>
            </div>
        </div>
    )
}