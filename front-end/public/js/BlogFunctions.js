const handleChangeText = (e, formData, setFormData) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

const handleChangeImage = (e, setSelectedImage) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
}

const handleChangeVideo = (e, setSelectedVideo) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedVideo(URL.createObjectURL(e.target.files[0]));
    }
}

const addInterviewSection = (setBlog, blog, questionKey, formData, setQuestionKey) => {
    setBlog(prevBlog => ({
        ...prevBlog,
        content: {
            ...prevBlog.content,
            interview: [...prevBlog.content.interview, {
                key: questionKey, 
                question: formData.question, 
                answer: formData.answer
            }]
        }
    }));
    setQuestionKey(questionKey + 1);
};

export { handleChangeText, handleChangeImage, handleChangeVideo, addInterviewSection }