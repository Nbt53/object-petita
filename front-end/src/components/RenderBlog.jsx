export default function RenderBlog({ blog }) {
    const renderInterview = () => {
        return blog.content.interview.map((interview, index) => {
            return (
                <div key={index} className="blog__interview mb-small">
                    <p className="blog__question mb-small">{interview.question}</p>
                    <p className="blog__answer mb-small">{interview.answer}</p>
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
                    <p className="blog__text">{blog.intro}</p>
                    <p className="blog__date">{blog.date}</p>
                    <video src={blog.video.url} className="blog-video mb-medium" controls ></video>
                    {renderInterview()}
                    <p className="blog__outro">{blog.outro}</p>


                </div>

            </div>
        </div>
    )
}