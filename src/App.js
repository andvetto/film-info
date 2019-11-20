import React from 'react';
import Home from './Pages/Home';
import Detail from './Pages/Detail';

import Footer from './Components/Footer';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';

function App() {



  return (
    <Router>
      
      <div className="App container-fluid text-center">
        
        <h1 className="my-3">Film Information</h1>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/:imdbID" component={Detail} />
        </main>
        
      </div>
      <Footer/>
    </Router>
  );
}

export default App;


