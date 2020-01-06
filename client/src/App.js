import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import movies from './components/dummyData';
import NavBar from './components/NavBar'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
      currentMovie: {}
    }
    this.currentReservation = {sofian: 5}
  }


  getMovies() {
    axios.get('/api/movies')
    .then((res)=> {
      console.log(res.data)
      this.setState({
        movies: movies
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleReservation(reservationData) {
    axios.post("/api/reserveFilm", reservationData)
    .then((res)=> {
      this.currentReservation =  res.data
    })
  }


  handleSearch(videoTitle) {
    this.state.movies.map((movie)=> {
      if(movie.Title == videoTitle) {
        this.setState({
          currentMovie: movie
        })
      }

    })
  }

  handleCardClick(i) {
    this.setState({
      currentMovie: this.state.movies[i]
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
