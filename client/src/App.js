import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
    }
  }

  handleReservation(reservationData) {
    
  }

  getMovies() {
    axios.get('/api/movies')
    .then((res)=> {
      console.log(res.data)
      this.setState({
        movies: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <p>
              good luck guys.
            </p>
              Learn React
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
