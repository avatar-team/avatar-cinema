import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import movies from './components/dummyData';
import MainPage from './components/MainPage';
import NavBar from './components/Navbar';
import MovieInfo from './components/MovieInfo'



class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
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


  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar handleSearch={(videoTitle)=> this.handleSearch(videoTitle)}/>
        <Switch>
          <Route path="/" exact component={()=> {
            return <MainPage handleReservation={(reservationData)=> this.handleReservation(reservationData)} movies={this.state.movies}/>
          }}/>
          <Route path="/movieInfo/:id" component={()=> {
            return <MovieInfo movies={this.state.movies}/>
          }}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
