import { useState } from "react";
import Title from "./components/Title";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Portfolio from "./views/Portfolio";

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

  return (
    <div className={'wrapper'}>
      <Title renderView={renderView} setCurrentView={setCurrentView} currentView={currentView} />
      {renderView(currentView)}

    </div>
  );
}

export default App;