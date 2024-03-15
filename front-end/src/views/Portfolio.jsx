import { useEffect, useState } from "react";
export default function Portfolio() {
    const [files, setFiles] = useState([]);
    const [host, setHost] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/files')
            .then(response => response.json())
            .then(data => setFiles(data.files))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setHost(window.location.hostname);
    }, [host]);
    const renderImages = () => {

        return files.map((file, index) => {
            return (
                <div key={index} className="portfolio-image__container">
                    <img src={`http://${host}:3000/images/ceramics/${file}`} alt={file} className="portfolio-image" />
                </div>
            )
        });
    }
    return (
        <section className="screen-container">
            <div className="portfolio">
                {renderImages()}
            </div>
        </section>
    )
}
