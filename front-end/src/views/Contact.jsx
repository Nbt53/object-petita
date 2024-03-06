import ViewTitle from "../components/ViewTitle";

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <section className="screen-container">
            <ViewTitle title={'contact me'} />

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-info">
                    <ion-icon name="mail-outline"></ion-icon>
                    <a href="mailto:simgevurtok@gmail.com" className="form-link">simgevurtok@gmail.com</a>
                </div>
                <div className="form-info">
                    <ion-icon name="logo-instagram"></ion-icon>
                    <a href="https://www.instagram.com/objectpetita_ceramics"  target="blank" className="form-link">@objectpetita_ceramics</a>
                </div>

                <input type="text" id="name" name="name" placeholder="Name" className="form-input" required />

                <input type="email" id="email" name="email" placeholder="E-mail" className="form-input" required />

                <textarea id="message" name="message" placeholder="Message" className="form-textarea" required></textarea>
                <div className="form-submit">
                    <input type="submit" value="Submit" className="form-button" />
                </div>

            </form>
        </section>
    );
}