import { BrowserRouter as Router } from "react-router-dom";
import Title from "./components/Title";
import Navigator from "./config/Navigator";

function App() {
  return (
    <Router>
      <div className={'wrapper'}>
        <Title />
        <Navigator />
      </div>
    </Router>
  );
}

export default App;