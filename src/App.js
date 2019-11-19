import React from 'react';
import Archivio from './Pages/Archivio';
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
      <div className="App container-fluid">
        <NavBar/>
        
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/archivio" component={Archivio} />
          <Route exact path="/:imdbID" component={Detail} />
        </main>
  
      </div>
    </Router>
  );
}

export default App;


