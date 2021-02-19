import { useEffect } from "react";
import "./4-css/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Auth_Page from "./3-pages/Auth_Page";
import DashboardContainer from "./3-pages/DashboardContainer";

function App() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route path="/connexion" component={Auth_Page} />
          <Route path="/dashboard" component={DashboardContainer} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
