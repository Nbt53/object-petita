import { useEffect, useState } from "react";
import Title from "./components/Title";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Portfolio from "./views/Portfolio";
import { MediaQueryProvider } from "./config/MediaContext";
import { testFirebase } from "./config/firebaseTest";

function App() {
  const [currentView, setCurrentView] = useState('home');
  const renderView = (currentView) => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Home />;
    }
  };

  // testFirebase()
  useEffect(() => {
    const storedView = localStorage.getItem('currentView');
    if (storedView) {
      setCurrentView(storedView);
    }
  }, []);

  return (
    <>
      <MediaQueryProvider>
        <div className={'wrapper'}>
          <Title renderView={renderView} setCurrentView={setCurrentView} currentView={currentView} />
          {renderView(currentView)}

        </div>
      </MediaQueryProvider>
    </>

  );
}

export default App;