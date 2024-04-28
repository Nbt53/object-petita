import { useState } from "react";
import formBG from '../../public/images/form-bg.jpg';

export default function Contact() {
    const [messageSent, setMessageSent] = useState(false);
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
                text: `${formValues.name} says: ${formValues.message} - ${formValues.email}`,
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(setMessageSent(true))
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <section className="screen-container">
            {!messageSent ?
                <div className="form-container">
                    <img src={formBG} alt="Form background" className="form-bg" />

                    <form className="form" onSubmit={handleSubmit}>

                        <div className="form-info__container">
                            <div className="form-info">
                                <ion-icon name="mail-outline"></ion-icon>
                                <a href="mailto:simgevurtok@gmail.com" className="form-link">simgevurtok@gmail.com</a>
                            </div>
                            <div className="form-info">
                                <ion-icon name="logo-instagram"></ion-icon>
                                <a href="https://www.instagram.com/objectpetita_ceramics" target="blank" className="form-link">@objectpetita_ceramics</a>
                            </div>
                        </div>

                        <div className="form-inputs">
                            <input onChange={handleChange} type="text" id="name" name="name" placeholder="Name" className="form-input mb-medium" value={formValues.name} required />

                            <input onChange={handleChange} type="email" id="email" name="email" placeholder="E-mail" className="form-input mb-medium" value={formValues.email} required />

                            <textarea onChange={handleChange} id="message" name="message" placeholder="Message" className="form-textarea mb-medium" value={formValues.message} required></textarea>
                            <div className="form-submit">
                                <input type="submit" value="Submit" className="button" />
                            </div>
                        </div>


                    </form>

                </div> : <h3 className="form-sent">Your message has been sent. I will be in touch shortly, Thank you!</h3>}

        </section>
    );
}