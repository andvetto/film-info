
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from '../Components/IsLoading';

class Detail extends React.Component { 


        constructor(props) {
        super(props);
        this.state = {
            data: "",
            risultato: [],
        };
    }  

    componentDidMount(props){

        let imdbID = this.props.match.params.imdbID;
        const API_KEY = "apikey=7e18b2af";

        fetch(`https://www.omdbapi.com/?i=${imdbID}&${API_KEY}`)
            .then(response => {
                console.log(response.status);
                this.setState({ response: response }, () => console.log(this.state));
                return response.json();
            })
            .then(data => {
                console.log("success", data);
                this.setState({
                    ajaxCompleted: true,
                    data: data,
               
                }, () => console.log(this.state));
                return data;
            }).then(film => {
                fetch(`http://localhost:3004/posts?title=${film.Title}`)
                .then(risposta => {
                        
                        return risposta.json();  
                })
                .then(risultato => {
                    
                        this.setState({risultato: risultato}, () => console.log(this.state, "banana"));
                        return risultato;
                })
                
              
                
            })
                
                                        
            .catch(error => this.setState({ error: error }));

    }


   manda() {

       let film = this.state.data;
   
        fetch("http://localhost:3004/posts", {
            method: "POST",
            body: JSON.stringify({ 
                "title" : `${film.Title}`,
                "year" : `${film.Year}`,
                "plot" : `${film.Plot}`,
                "genre" : `${film.Genre}`,
                "actors" : `${film.Actors}`,
                "director" : `${film.Director}`,
                "runtime" : `${film.Runtime}`,
                "img" : `${film.Poster}`,
                }),
            headers: {"Content-Type" : "application/json"}

        })
        .then(() => this.setState({ risultato: [1, 2]} ));
        
    }

    render(){
        var bottone;
        //var classe = this.state.risultato.length ? "gialla" : "bianca" ;
        if(this.state.risultato.length===0){
            bottone = (

                <i className="fa fa-star stellaBianca" onClick={() => this.manda()} aria-hidden="true"></i>
            );
        } else {
            bottone = <i className="fa fa-star stellaGialla" aria-hidden="true"></i>
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
                    <NavLink exact to="/" className="btn btn-primary mx-2">
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