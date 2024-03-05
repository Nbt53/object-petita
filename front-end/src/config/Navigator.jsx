function Navigator({ renderView, setCurrentView }) {


    const handleViewChange = (view) => {
        setCurrentView(view);
        renderView(view);
    };
    return (
        <div>
            <div className="nav-top">
                <button onClick={() => handleViewChange('home')} className="nav-top__link">Home</button>
                <button onClick={() => handleViewChange('portfolio')} className="nav-top__link">Portfolio</button>
                <button onClick={() => handleViewChange('about')} className="nav-top__link">About</button>
                <button onClick={() => handleViewChange('contact')} className="nav-top__link">Contact</button>
            </div>

        </div>
    );
}

export default Navigator;