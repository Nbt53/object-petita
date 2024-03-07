import { useEffect, useState } from "react";

export default function Slideshow() {
    const [image, setImage] = useState('./images/ceramics/mask-1.png');
    const imageList = ['./images/ceramics/mask-1.png', './images/ceramics/plate-1.png', './images/ceramics/plate-2.png']

    const nextImage = () => {
        let index = imageList.indexOf(image);
        if (index === imageList.length - 1) {
            setImage(imageList[0]);
        } else {
            setImage(imageList[index + 1]);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 6000);
        return () => clearInterval(interval);
    }, [image]);
    
    return (
        <div className="slideshow-container">
            <div className="slideshow">
                <div className="slideshow-image-container">
                    <img src={image} alt="mask-1" className="slideshow-image" />
                </div>

            </div>
        </div>
    )
}