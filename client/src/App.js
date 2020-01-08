import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import movies from './components/dummyData';
import MainPage from './components/MainPage';
import NavBar from './components/Navbar';
import MovieInfo from './components/MovieInfo'
import Test from './components/test'
import Dashboard from './components/Admin/Dashboard'
import User from './components/User'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
      currentReservation: {},
      currentMovie: {}
    }
  }

  
  //client handle functions
  getMovies() {
    axios.get('/API/movies')
    .then((res)=> {
      console.log(res.data)
      if(Array.isArray(res.data)) {
        this.setState({
          movies: [...res.data]
        })
      }else {
        this.setState(prevState => {
          prevState.movies.push(res.data)
          return({
            movies: [...prevState.movies]
          })
        })
      }
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
      if(movie.Title === videoTitle) {
        this.setState({
          currentMovie: movie
        })
      }

    })
  }


  //Admin handle functions
  handleAdd(movieData) {
    axios.post('/api/movies/addMovie', movieData)
    .then(res => {
      console.log(res)
      this.setState((prevState)=> {
        return ({
          movies: [...prevState.movies, res.data]
        })
      }, ()=> console.log(this.state.movies))
    })
  }

  handleUpdate(movieId, newData) {
    console.log(newData)
    axios.patch(`/api/movies/${movieId}`, newData)
    .then(res => {
      console.log(res)
      this.setState(prevState => {
        var newMovies = prevState.movies.map((movie, i)=> {
          if(movie._id == movieId) return res.data;
          return movie;
        })
        return({
          movies: [...newMovies]
        })
      })
    })
  }

  handleDelete(movieId) {
    axios.delete(`/api/movies/${movieId}`)
    .then(res => {
      this.setState(prevState => {
        var index;
        prevState.movies.forEach((movie, i)=> {
          if(movie._id == movieId) index = i;
        })
        prevState.movies.splice(index, 1)
        return({
          movies: [...prevState.movies]
        })
      })
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
            // console.log(new Date(this.state.movies[0].playDate).toLocaleDateString())
            return <MainPage movies={this.state.movies}/>
          }}/>
          <Route path="/movieInfo/:index" component={()=> {
            return <MovieInfo reservationInfo={this.state.currentReservation} handleReservation={(reservationData)=> this.handleReservation(reservationData)} movies={this.state.movies}/>
          }}/>
          <Route path="/admin/Dashboard" component={()=> {
            return <Dashboard movies={this.state.movies} handleUpdate={(updatedMovie, movieData)=> this.handleUpdate(updatedMovie, movieData)}
            handleAdd={(addedMovie)=> this.handleAdd(addedMovie)}
            handleDelete={(deletedMovi)=> this.handleDelete(deletedMovi)} />
          }}/>
          <Route path="/user" component={User}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
