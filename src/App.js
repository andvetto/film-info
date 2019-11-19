import React from 'react';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import NavBar from './Components/NavBar';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App container-fluid text-center">
        
        <h1 className="my-3">Film Information</h1>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/:imdbID" component={Detail} />
        </main>

      </div>
      <footer>
        <div className="text-center bg-dark py-3 text-secondary">
          <p>© 2019 Copyright</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;


