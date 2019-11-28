
import React from 'react';
import { NavLink } from 'react-router-dom';
//import IsLoading from './IsLoading';

class MoviePoster extends React.Component { 

    render(){
    
        
            if(this.props.ricerca.Search){
                var films = this.props.ricerca.Search;
                
                return (

                <>
                    {films.map( film => 

                    (
                        <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={film.imdbID} >

                            <div className="card" >
                                <img src={film.Poster!=="N/A"? film.Poster : "https://via.placeholder.com/300x410"} alt={film.Title} />
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{film.Title}</h5>
                                    <p className="card-text">{film.Year}</p>
                                    <NavLink exact to={ `/detail/${film.imdbID}` } className="btn btn-primary">
                                        Go to detail
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}

                </>
                )
            }
            if(this.props.ricerca.Error === "Movie not found!")
            return (
                <div className="container-fluid text-center">
                    <h3>Il film cercato non è presente nel nostro database!</h3>
                </div>
            )

        
        
        return (
            <div className="container-fluid text-center">
                <h3>Ricerca un film o una serie tv inserendo una parola del titolo</h3>
            </div>
        )
  
    }
}
export default MoviePoster;