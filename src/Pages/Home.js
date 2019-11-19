
import React from 'react';
import MoviePoster from '../Components/MoviePoster';

class Home extends React.Component {
    


    render() {
        
        return(
            <>
            <h1>Film Information</h1>
            <div className="row" >
            <MoviePoster/>
                
            </div>
            </>
        )
  
        
    }
}

export default Home;