import { useContext } from "react";
import { useState } from "react";
import { AllContext } from "../../context/AllContext";
import ViewTile from "../components/ViewTitle";
import formBG from '../../public/images/form-bg.jpg';
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

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: formValues.email,
                subject: 'Contact Form Submission',
                text: `${formValues.name} says: ${formValues.message}`,
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <section className="screen-container">

            <div className="form-container">
                <img src={formBG} alt="Form background" className="form-bg" />
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-info">
                        <ion-icon name="mail-outline"></ion-icon>
                        <a href="mailto:simgevurtok@gmail.com" className="form-link">simgevurtok@gmail.com</a>
                    </div>
                    <div className="form-info">
                        <ion-icon name="logo-instagram"></ion-icon>
                        <a href="https://www.instagram.com/objectpetita_ceramics" target="blank" className="form-link">@objectpetita_ceramics</a>
                    </div>

                    <input onChange={handleChange} type="text" id="name" name="name" placeholder="Name" className="form-input mb-medium" value={formValues.name} required />

                    <input onChange={handleChange} type="email" id="email" name="email" placeholder="E-mail" className="form-input mb-medium" value={formValues.email} required />

                    <textarea onChange={handleChange} id="message" name="message" placeholder="Message" className="form-textarea mb-medium" value={formValues.message} required></textarea>
                    <div className="form-submit">
                        <input type="submit" value="Submit" className="button" />
                    </div>

                </form>
                <div className="form-text">
                    <ViewTile title="Contact" />
                    <p className="mb-small">send me a message if you want to contact me, i can make you a clay pigeon or some clay food</p>
                    <p className="mb-small">contact me about about my puppetry stuff too, i like puppets they are funny lol</p>
                </div>
            </div>

        </section>
    );
}