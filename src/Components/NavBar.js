
import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
    }

    handleSubmit(event) {
        
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        
        return(
            <nav className="navbar navbar-light bg-light justify-content-center">

                <a className="navbar-brand" href="/">Film Info</a>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit} >
                    <input className="form-control mr-sm-2" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search" aria-label="Search"/>
                    <button onClick={this.onSubmit} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                
            </nav>
        )
  
        
    }
}

export default NavBar