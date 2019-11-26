
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from '../Components/IsLoading';
import Auth from '../Auth/auth';
const axios = require('axios');

class Detail extends React.Component { 


        constructor(props) {
        super(props);
        this.state = {
            data: "",
            risultato: [],
            user: Auth.getUser(),
            token: Auth.getToken(),
            
        };
    }  

    componentDidMount(props){

        let imdbID = this.props.match.params.imdbID;
        const API_KEY = "apikey=7e18b2af";
        

        fetch(`https://www.omdbapi.com/?i=${imdbID}&${API_KEY}`)
            .then(response => {
                
                this.setState({ response: response });
                return response.json();
            })
            .then(data => {
                
                this.setState({
                    ajaxCompleted: true,
                    data: data,
               
                });
                return data;
            }).then(film => {
                //fetch(`http://localhost:3004/posts?title=${film.Title}`)
                //fetch(`https://film-info-35efc.firebaseio.com/favorite/films/${film.imdbID}.json`)
                axios.get(`http://localhost:8000/favorites/${this.state.user.id}/detail/${film.imdbID}`)
                .then(risposta => {
                        
                    if(risposta.data.length!==0){
                        this.setState({ risultato: [risposta.data[0].title]})
                    } else{
                        this.setState({ risultato: []})
                    } 
                });
                               
            })
                
                                        
            .catch(error => this.setState({ error: error }));

    }


   cancella() {
        
        let film = this.state.data;
        let token = this.state.token;
        
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
       
   
        //fetch(`https://film-info-35efc.firebaseio.com/favorite/films/${film.imdbID}.json`, 
        axios.delete(`http://localhost:8000/favorites/${this.state.user.id}/delete/${film.imdbID}`)
        .then(() => this.setState({ risultato: []} ));
        
    }

   manda() {

       let film = this.state.data;
   
    //    fetch("http://localhost:3004/posts", {
    //    fetch(`https://film-info-35efc.firebaseio.com/favorite/films/${film.imdbID}.json`,
        let token = this.state.token;
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        axios.post(`http://localhost:8000/favorites`, 
 
        {
            
            "user_id" : `${this.state.user.id}`, 
            "title" : `${film.Title}`,
            "year" : `${film.Year}`,
            "plot" : `${film.Plot}`,
            "genre" : `${film.Genre}`,
            "actors" : `${film.Actors}`,
            "director" : `${film.Director}`,
            "runtime" : `${film.Runtime}`,
            "img" : `${film.Poster}`,
            "imdbID" : `${film.imdbID}`,
                
        })
        .then(this.setState({ risultato: [1,2]} ))
        //.then(console.log(this.state.risultato, "pippo"))
    }

    render(){
        var bottone;
        //console.log(this.state.token)
        //console.log(this.state.risultato, "pluto")
        //var classe = this.state.risultato.length ? "gialla" : "bianca" ;
        if(this.state.user){

        
        if(this.state.risultato.length===0){
            bottone = <i className="fa fa-star stellaBianca" onClick={() => this.manda()} aria-hidden="true"></i>

        } else {
            bottone = <i className="fa fa-star stellaGialla" onClick={() => this.cancella()} aria-hidden="true"></i>
        }
    }
        if(this.state.data){
            let film = this.state.data;
            return (
                <div className="container text-center border border-secondary py-3">
                    <h2>{film.Title}</h2>
                    <img src={film.Poster} className="my-3" alt={film.Title} />
                    <p>{film.Plot}</p>
                    <p>Director: {film.Director}</p>
                    <p>Actors: {film.Actors}</p>
                    <p>Genre: {film.Genre}</p>
                    <p>Runtime: {film.Runtime}</p>
                    <p>Year: {film.Year}</p>
                    <NavLink exact to={ `/${film.Title.split(" ")[0]}` } className="btn btn-primary mx-2">
                        Go Back
                    </NavLink>
                    {bottone}
                </div>

      
              

            )
        }
        if(this.state.error) {
            let error = this.state.error;
            return <p>{error}</p>
        }
        return <IsLoading/>
    }
}
export default Detail;