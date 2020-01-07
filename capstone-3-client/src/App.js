import React from 'react';
import Register from "./Register/Register";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <main className='App'>
      {/* content goes here */}
      <Switch>
          <Route exact to={'/register'}><Register/></Route>
      </Switch>

    </main>
  );
}

export default App;
