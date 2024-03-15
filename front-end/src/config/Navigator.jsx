function Navigator({ renderView, setCurrentView, currentView }) {


    const handleViewChange = (view) => {
        setCurrentView(view);
        renderView(view);
    };
    return (
        <>
            <div className="nav-top">
                <button onClick={() => handleViewChange('home')} className={`nav-top__link ${currentView === 'home' ? 'active' : ''}`}>Home</button>
                <button onClick={() => handleViewChange('portfolio')} className={`nav-top__link ${currentView === 'portfolio' ? 'active' : ''}`}>Portfolio</button>
                <button onClick={() => handleViewChange('about')} className={`nav-top__link ${currentView === 'about' ? 'active' : ''}`}>About</button>
                <button onClick={() => handleViewChange('contact')} className={`nav-top__link ${currentView === 'contact' ? 'active' : ''}`}>Contact</button>
            </div>

        </>
    );
}

export default Navigator;