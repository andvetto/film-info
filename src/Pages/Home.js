
import React from 'react';
import MoviePoster from '../Components/MoviePoster';
import NavBar from '../Components/NavBar';


class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        
      }
    
    handleChange(event) {
        this.setState({value: event.target.value}, () => console.log(this.state));
    }



    render() {
        
        return(
            <>
            <NavBar  onChange={event => this.handleChange(event)} />
            <div className="row" id="pippo" >
                <MoviePoster searchValue={this.state.value} />
            </div>
            </>
        )
  
        
    }
}

export default Home;