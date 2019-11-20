
import React from 'react';
import { NavLink } from 'react-router-dom';
import IsLoading from './IsLoading';

class MoviePoster extends React.Component { 

    render(){
      
        if(this.props.ricerca){
            var films = this.props.ricerca.Search;
            
            return (

            <>
                {films.map( film => 

                (
                    <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={film.imdbID} >

                        <div className="card" >
                            <img src={film.Poster} alt={film.Title} />
                            <div className="card-body text-dark">
                                <h5 className="card-title">{film.Title}</h5>
                                <p className="card-text">{film.Year}</p>
                                <NavLink exact to={ `/${film.imdbID}` } className="btn btn-primary">
                                    Go to detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}

            </>
            )
        }
        if(this.props.error) {
            let error = this.props.error;
            return <p>{error}</p>
        }
        if(!this.props.ricerca){
            return null;
        }
        return <IsLoading/>
    }
}
export default MoviePoster;