import { auth } from '../config/Auth';
import { useAdmin } from '../../public/js/checkAdmin';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDynamicHeightField } from '../../public/js/hooks/DynamicHeightField';
import BlogContent from '../components/BlogContent';
import { addInterviewSection, handleChangeImage, handleChangeText, handleChangeVideo } from '../../public/js/BlogFunctions';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import Submitting from '../components/Submitting';
import Submitted from '../components/Sumbitted';
import AdminButton from '../components/AdminButton';

export default function EditBlog({ blog }) {

    const [admin] = useAdmin(auth);
    const navigate = useNavigate();
    !admin && navigate('/');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);


    const [formData, setFormData] = useState({
        title: blog.title,
        slug: blog.slug,
        intro: blog.intro,
        outro: blog.outro,
        image: '',
        video: '',
        question: 'new question?',
        answer: 'new answer?',
        date: blog.date
    });

    const [editedBlog, setBlog] = useState({
        ...blog
    })
    const [questionKey, setQuestionKey] = useState(100);

    const contentRef = useRef(null);
    const questionRef = useRef(null);
    const answerRef = useRef(null);

    useDynamicHeightField(contentRef, formData.intro);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const imgInput = document.getElementById('img').files[0] || null;
        const img = imgInput ? imgInput : console.log('no img');
        const vidInput = document.getElementById('video').files[0] || null;
        const vid = vidInput ? vidInput : console.log('no vid');
        const imageRef = ref(storage, `blog/${img.name}`);
        const videoRef = ref(storage, `blog/${vid.name}`);
        await uploadBytes(imageRef, img);
        await uploadBytes(videoRef, vid);
        const imgURL = await getDownloadURL(imageRef);
        const vidURL = await getDownloadURL(videoRef);
        const id = Math.random().toString(36).substring(7);
        // eslint-disable-next-line no-unused-vars
        const { question, answer, image, video, ...restFormData } = formData;
        const updatedBlog = {
            ...restFormData,
            content: blog.content,
            id: id,
            image: { url: imgURL, path: imageRef.fullPath },
            video: { url: vidURL, path: videoRef.fullPath }
        }
        setBlog(updatedBlog);
        try {
            await addDoc(collection(db, 'blog'), updatedBlog)
            setSubmitted(true);
            setSubmitting(false);
        } catch (e) {
            console.error('Error adding document: ', e);
            setSubmitting(false);
        }
    }

    return (
        <div className="screen-container">

            {submitting ? (
                <Submitting text={'submitting'} />
            ) : null}

            {submitted ? (
                <Submitted setSubmitted={setSubmitted} />

            ) : null}
            {!submitting && !submitted ?
                (<>
                   
                    <div className="blog">
                        <div className="blog-container">
                            <div className="blog-image">
                                <input type="file" id='img' accept="image/*" onChange={(e) => handleChangeImage(e, setSelectedImage)} />
                                { <img src={selectedImage || blog.image.url} className="blog-image__img" alt="Selected" />}

                            </div>
                            <div className="blog-content">
                                <input className='form-blog-input blog__title'
                                    name='title'
                                    value={formData.title}
                                    onChange={(e) => handleChangeText(e, formData, setFormData)}
                                />
                                <input className='form-blog-input blog__text'
                                    name='slug'
                                    value={formData.slug}
                                    onChange={(e) => handleChangeText(e, formData, setFormData)}
                                />
                                <BlogContent type='textarea' name='intro' value={formData.intro} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={contentRef} />
                                <BlogContent type='date' name='date' value={formData.date} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={contentRef} />

                                <input type="file" id='video' accept="video/*" onChange={(e) => handleChangeVideo(e, setSelectedVideo)} />
                                { <video src={selectedVideo || blog.video.url} className="blog-video mb-medium" ></video>}

                                <div className="blog__interview">
                                    <AdminButton func={() => addInterviewSection(setBlog, editedBlog, questionKey, formData, setQuestionKey)} />
                                    {editedBlog.content.interview.map((section) => {

                                        return (
                                            <div key={section.key} className="blog__interview-section">
                                                <BlogContent type='textarea' name={`question`} value={section.question} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={questionRef} />
                                                <BlogContent type='textarea' name={`answer`} value={section.answer} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={answerRef} />
                                            </div>
                                        )
                                    })
                                    }
                                    <div className="blog__interview-section">
                                        <BlogContent type='textarea' name={`question`} value={formData[`question`]} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={questionRef} />
                                        <BlogContent type='textarea' name={`answer`} value={formData[`answer`]} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={answerRef} />
                                    </div>
                                    <BlogContent type='textarea' name='outro' value={formData.outro} handleChange={(e) => handleChangeText(e, formData, setFormData)} contentRef={contentRef} />

                                </div>

                            </div>
                        </div>
                    </div>
                </>)
                : null}
        </div >
    )
}