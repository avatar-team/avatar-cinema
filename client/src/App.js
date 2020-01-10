import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import movies from './components/dummyData';
import MainPage from './components/MainPage';
import NavBar from './components/Navbar';
import MovieInfo from './components/MovieInfo'
import Test from './components/test'
import Dashboard from './components/Admin/Dashboard'
import User from './components/User';
import Signup from './components/Signup.js';
import Login from './components/Login.js'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      movies: [],
      currentReservation: {},
      isUserLoggedIn: false,
      currentUser: {}
    }
  }

  
  //client handle functions
  getMovies() {
    axios.get('/API/movies')
    .then((res)=> {
      console.log(res.data)
      this.setState({
        movies: [...this.state.movies, ...res.data]
      })
      // if(Array.isArray(res.data)) {
      //   this.setState({
      //     movies: [...res.data]
      //   })
      // }else {
      //   this.setState(prevState => {
      //     prevState.movies.push(res.data)
      //     return({
      //       movies: [...prevState.movies]
      //     })
      //   })
      // }
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

  //Admin handle functions
  handleAdd(movieData) {
    axios.post('/api/movies', movieData)
    .then(res => {
      console.log(res)
      this.setState((prevState)=> {
        return ({
          movies: [...prevState.movies, ...res.data]
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

  changeUserState(state) {
    console.log(state)
    this.setState({
      isUserLoggedIn: state
    })
  }

  componentDidMount() {
    let token = localStorage.getItem('x-auth-token')
    axios.get('/api/user/',{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      console.log(res)
      if(res.data.status) {
        this.setState({
          currentUser: res.data.user,
          isUserLoggedIn: true
        })
      }
    }).catch(err=> {
      console.log(err)
    })
    this.getMovies();
  }

  render() {
    let helper = videoTitle => this.handleSearch(videoTitle)
    return (
      <BrowserRouter>
        {console.log(this.state.movies)}
        <NavBar changeUserState={(state)=> this.changeUserState(state)} isUserLoggedIn={this.state.isUserLoggedIn} movies={this.state.movies} handleSearch={(videoTitle)=> helper(videoTitle)}/>
        <Switch>
          <Route path="/" exact component={(data)=> {
            // console.log(data)
            return <MainPage isUserLoggedIn={this.state.isUserLoggedIn} movies={this.state.movies}/>
          }}/>
          <Route path="/movieInfo/:index" component={()=> {
            return <MovieInfo isUserLoggedIn={this.state.isUserLoggedIn} reservationInfo={this.state.currentReservation} handleReservation={(reservationData)=> this.handleReservation(reservationData)} movies={this.state.movies}/>
          }}/>
          <Route path="/admin" component={()=> {
            return <Dashboard movies={this.state.movies} handleUpdate={(updatedMovie, movieData)=> this.handleUpdate(updatedMovie, movieData)}
            handleAdd={(addedMovie)=> this.handleAdd(addedMovie)}
            handleDelete={(deletedMovie)=> this.handleDelete(deletedMovie)} />
          }}/>
          <Route path="/user" exact component={User}/>
          <Route path="/signup" exact component={()=> {
            return <Signup changeUserState={(state, userData)=> this.changeUserState(state, userData)} 
            isUserLoggedIn={this.state.isUserLoggedIn}/>
          }}/>
          <Route path="/login" exact component={(data)=> {
            console.log(data)
            return <Login history={data.history}  changeUserState={(state, userData)=>this.changeUserState(state, userData)} 
            isUserLoggedIn={this.state.isUserLoggedIn}/>
          }}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
