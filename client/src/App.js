import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import movies from './components/dummyData';
import MainPage from './components/MainPage';
import NavBar from './components/Navbar';
import MovieInfo from './components/MovieInfo'
import Test from './components/test'


class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
      currentReservation: {}
    }
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
    // axios.post("/api/reserveFilm", reservationData)
    // .then((res)=> {
    //   this.currentReservation =  res.data
    // })
    this.setState({
      currentReservation: reservationData
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
            return <MainPage movies={this.state.movies}/>
          }}/>
          <Route path="/movieInfo/:index" component={()=> {
            return <MovieInfo reservationInfo={this.state.currentReservation} handleReservation={(reservationData)=> this.handleReservation(reservationData)} movies={this.state.movies}/>
          }}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
