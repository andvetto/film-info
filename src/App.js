import React from 'react';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import Login from './Components/Login';
import Signup from './Components/Signup';

import Footer from './Components/Footer';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';
import Favorites from './Pages/Favorites';

function App() {



  return (
    <Router>
      
      <div className="App container-fluid bg-dark text-light text-center">
        
        <h1 id="name" className="py-3">Film Information</h1>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/:titolo" component={Home} />
          <Route exact path="/detail/:imdbID" component={Detail} />
          <Route exact path="/favorites/list" component={Favorites} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/signup" component={Signup} />
        </main>
        <Footer/>
      </div>
      
    </Router>
  );
}

export default App;


