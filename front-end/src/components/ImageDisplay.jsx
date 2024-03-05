export default function ImageDisplay({image}) {

    return (
        <div className="image-bar">
            <div className="image-container" >
                <img className="image" src={image} alt="A clay mask" />
            </div>

        </div>

    )
}