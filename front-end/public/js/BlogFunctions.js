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
    setBlog({
        blog, content: {
            interview: [...blog.content.interview, {
                key: questionKey, question: formData.question, answer: formData.answer
            }]
        }
    })
    setQuestionKey(questionKey + 1);
    console.log(blog)
};

export { handleChangeText, handleChangeImage, handleChangeVideo, addInterviewSection }