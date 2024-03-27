import { auth } from '../config/Auth';
import { useAdmin } from '../../public/js/checkAdmin';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useDynamicHeightField = (ref, value) => {
    useEffect(() => {
        if (ref.current && ref.current.scrollHeight) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [value]);
};

export default function BlogCreate() {
    const [admin] = useAdmin(auth);
    const navigate = useNavigate();
    !admin && navigate('/');
    const [formData, setFormData] = useState({
        title: 'Title',
        content: 'Just some text',
        image: '',
        question: 'question',
        answer: 'answer',
        date: ''
    });

    const contentRef = useRef(null);
    const questionRef = useRef(null);
    const answerRef = useRef(null);

    useDynamicHeightField(contentRef, formData.content);
    useDynamicHeightField(questionRef, formData.question);
    useDynamicHeightField(answerRef, formData.answer);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submit = () => {
        console.log(formData)
    }

    return (
        <div className="screen-container">
            {admin ? <div className="portfolio-admin" onClick={submit}> </div> : null}
            <div className="blog">
                <div className="blog-container">
                    <div className="blog-image">
                        <img src="./images/about.png" alt="blog" className="blog-image__img" />
                    </div>

                    <div className="blog-content">
                        <input className='form-blog-input blog__title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea ref={contentRef} className='form-blog-input blog__text'
                            name='content'
                            value={formData.content}
                            onChange={handleChange}
                        />

                        <textarea ref={questionRef} className='form-blog-input blog__question'
                            name='question'
                            value={formData.question}
                            onChange={handleChange}
                        />

                        <textarea ref={answerRef} className='form-blog-input blog__answer'
                            name='answer'
                            value={formData.answer}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}