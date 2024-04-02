// bootstrap css import-
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar/Navbar';
import MainRoutes from './routes/MainRoutes';
import "./App.css";
import ThemeContext from './providers/ThemeContext';
import { useEffect, useState } from 'react';


function App() {
  const [theme, setTheme] = useState("dark");

  // It will only execute once on initial render to load the app initially acoording to the theme preference stored in localStorage-
  useEffect(() => {
    const userTheme= localStorage.getItem("theme");
    if (userTheme) {
      setTheme(userTheme);
    }
  }, []);

  return (
      <div id= "app-wrapper d-flex flex-column" data-theme= {theme} >
        <ThemeContext.Provider value= {{theme, setTheme}}>
            <Navbar />
            <MainRoutes />
        </ThemeContext.Provider>
      </div>
  )
}

export default App;