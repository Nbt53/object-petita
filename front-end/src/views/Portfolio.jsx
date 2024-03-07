import { useEffect, useState } from "react";
import ViewTitle from "../components/ViewTitle";

export default function Portfolio() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/files')
            .then(response => response.json())
            .then(data => setFiles(data.files))
            .catch(error => console.error(error));
    }, []);

    const renderImages = () => {
        return files.map((file, index) => {
            return (
                <div key={index} className="portfolio-image__container">
                    <img src={`http://localhost:3000/images/ceramics/${file}`} alt={file} className="portfolio-image" />
                </div>
            )
        });
    }
    return (
        <section className="screen-container">
            <ViewTitle title={'Portfolio'} />
            <div className="portfolio">
                {renderImages()}
            </div>
        </section>
    )
}
