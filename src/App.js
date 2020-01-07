import React from 'react';
import Register from "./Register/Register";
import {Route, Switch} from "react-router-dom";
import PublicOnlyRoute from "./PublicOnlyRoute/PublicOnlyRoute";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <main className='App'>
      {/* content goes here */}
      <Switch>
          <PublicOnlyRoute exact to={'/register'}><Register/></PublicOnlyRoute>
          <PublicOnlyRoute exact to={'/landing-page'}><LandingPage/></PublicOnlyRoute>
      </Switch>

    </main>
  );
}

export default App;
