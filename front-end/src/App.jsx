import { BrowserRouter as Router } from "react-router-dom";
import Title from "./components/Title";
import Navigator from "./config/Navigator";
import { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/Firebase";
import { AllProvider } from "../context/AllContext";


function App() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Update your app's user state here
      } else {
        // User is signed out
        // Update your app's user state here
      }
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          setDoc(doc(db, 'users', user.uid), {
            admin: false,
            firstName: user.displayName.split(' ')[0] || '',
            lastName: user.displayName.split(' ')[1] || '',
            email: user.email,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (

    <AllProvider>
      <Router>
        <div className={'wrapper'}>
          <Title />
          <Navigator />
        </div>
      </Router>
    </AllProvider>


  );
}

export default App;