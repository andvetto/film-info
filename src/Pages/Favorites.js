import React from 'react';
import { NavLink } from 'react-router-dom';

const API_URL = 'http://localhost:3004'

export default class Favorites extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            response: "",
            
        };
    } 

    componentDidMount() {
        fetch(API_URL + '/posts')
        .then(response => response.json())
        .then(data => this.setState({ posts: data }))
        .catch(error => this.setState({ error: error }));
    }

    render(){
        if(this.state.posts){
            var films = this.state.posts;
            
            return (

            <div className="row">
                <div className="col-12">
                    <NavLink exact to={ "/" } className="btn btn-info my-2">
                        Go Back
                    </NavLink>
                </div>

                {films.map( film => 

                (
                    <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={film.id} >

                        <div className="card" >
                            <img src={film.img} alt={film.title} />
                            <div className="card-body text-dark">
                                <h5 className="card-title">{film.title}</h5>
                                <p className="card-text">{film.year}</p>
                                <NavLink exact to={ `/detail/${film.id}` } className="btn btn-primary mx-2 my-2">
                                    Go to detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}

            
            </div>
            )
        }

            return null;
  
    }
}

