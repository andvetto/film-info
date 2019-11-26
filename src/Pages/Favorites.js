import React from 'react';
import { NavLink } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Auth from '../Auth/auth';
const axios = require('axios');

//const API_URL = 'http://localhost:3004'

export default class Favorites extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            response: "",
            films:[],
            user:Auth.getUser(),
        };
        
    } 

    

    componentDidMount() {
    //    fetch(API_URL + '/posts')
    //    fetch(`https://film-info-35efc.firebaseio.com/favorite.json`)
    axios.get(`http://localhost:8000/favorites/list/${this.state.user.id}`)
        .then(response => this.setState({ films: response.data }))
        .catch(error => this.setState({ error: error }));
    }

    render(){
        //console.log(this.state.films, "pippo")
        if(this.state.films){
            var films = this.state.films;
            
            return (
                <>
                <BackButton/>
                <div className="row">
                    {films.map( film => 


                    (
                        <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={film.id} >

                            <div className="card" >
                                <img src={film.img} alt={film.title} />
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{film.title}</h5>
                                    <p className="card-text">{film.year}</p>
                                    <NavLink exact to={ `/detail/${film.imdbID}` } className="btn btn-primary mx-2 my-2">
                                        Go to detail
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}

                
                </div>
                </>
            )
        }
         return (
            <> 
            <BackButton/>
            <div className="container-fluid text-center">
                <h3>Non hai inserito alcun film tra i preferiti!</h3>
            </div>
            </>
         )
    } 
   
  
}


