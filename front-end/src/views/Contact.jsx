import { useState } from "react";

export default function Contact() {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    }

    return (
        <section className="screen-container">

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-info">
                    <ion-icon name="mail-outline"></ion-icon>
                    <a href="mailto:simgevurtok@gmail.com" className="form-link">simgevurtok@gmail.com</a>
                </div>
                <div className="form-info">
                    <ion-icon name="logo-instagram"></ion-icon>
                    <a href="https://www.instagram.com/objectpetita_ceramics" target="blank" className="form-link">@objectpetita_ceramics</a>
                </div>

                <input onChange={handleChange} type="text" id="name" name="name" placeholder="Name" className="form-input" value={formValues.name} required />

                <input onChange={handleChange} type="email" id="email" name="email" placeholder="E-mail" className="form-input" value={formValues.email} required />

                <textarea onChange={handleChange} id="message" name="message" placeholder="Message" className="form-textarea" value={formValues.message} required></textarea>
                <div className="form-submit">
                    <input type="submit" value="Submit" className="form-button" />
                </div>

            </form>
        </section>
    );
}