import Navigator from "../config/Navigator";

export default function Title({ renderView, setCurrentView, currentView }) {
    const handleViewChange = (view) => {
        setCurrentView(view);
        renderView(view);
    };
    return (
        <div className="header">
            <div className="header-container">
                <div>
                    <div className="header-title__container" onClick={() => handleViewChange('home')}>
                        <h1 className="header-title mb-small" >Object Petit a</h1></div>
                    <Navigator renderView={renderView} setCurrentView={setCurrentView} currentView={currentView} />
                </div>

                <div className="socials-wrapper">
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                </div>
            </div>

        </div>
    )
}