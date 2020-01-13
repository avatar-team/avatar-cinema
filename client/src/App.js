import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import MainPage from './components/MainPage';
import NavBar from './components/Navbar';
import MovieInfo from './components/MovieInfo'
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
      user: {}
    }
  }

  
  // Client handle functions
  getMovies() {
    axios.get('/API/movies')
    .then((res)=> {
      this.setState({
        movies: [...this.state.movies, ...res.data]
      })
    })
    .catch(err => {
    })
  }



  // Admin handle functions
  handleAdd(movieData) {
    let token = localStorage.getItem('admin-auth-token')
    axios.post('/api/movies', movieData)
    .then(res => {
      this.setState((prevState)=> {
        prevState.movies.push(res.data[0])
        return ({
          movies: [...prevState.movies]
        })
      }, ()=> {})

    })
  }

  // Function Handling update a movie
  handleUpdate(movieId, newData) {

    let token = localStorage.getItem('admin-auth-token')
    console.log(newData)
    axios.patch(`/api/movies/${movieId}`, newData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
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

  // Function Handling Delete a movie
  handleDelete(movieId, i) {

    let token = localStorage.getItem('admin-auth-token')
    axios.delete(`/api/movies/${movieId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      this.setState(prevState => {
        prevState.movies.splice(i, 1)
        return({
          movies: [...prevState.movies]
        })
      })
    })
  }

  changeUserState(state, userData) {
    this.setState({
      isUserLoggedIn: state,
      user: userData
    })
  }

  isFavorite(movieId) {
    if(this.state.user != undefined) {
      let favorite = this.state.user.favoriteMovies
      if( favorite != undefined){
        for(var i = 0; i < favorite.length; i++) {
          if(favorite[i]._id === movieId) return true;
        }
      }
      return false;

    }
  }

  changeFavoriteState(state, movieId, userId) {
      if(state == 'add') {
        axios.post('/api/user/favorite', {movieId: movieId, userId: userId})
        .then(res=> {
          this.getUser()
        })
        .catch(err => {
        })
      }else if(state == "delete") {
        axios.delete(`/api/user/favorite/${userId}/${movieId}`)
        .then(res=> {
        })
        .catch(err => {})
      }
  }

  // Function to get users Data from '/api/user'
  getUser() {
    let token = localStorage.getItem('x-auth-token')
    axios.get('/api/user/',{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      if(res.data.status) {
        this.setState({
          user: res.data.user,
          isUserLoggedIn: true
        })
      }
    }).catch(err=> {})
  }

  componentDidMount() {
    this.getUser()
    this.getMovies();
  }

  render() {
    let helper = videoTitle => this.handleSearch(videoTitle)
    return (
      <BrowserRouter>
        <NavBar changeUserState={(state, userData)=> this.changeUserState(state, userData)} isUserLoggedIn={this.state.isUserLoggedIn} 
        movies={this.state.movies} handleSearch={(videoTitle)=> helper(videoTitle)}/>
        <Switch>
          <Route path="/" exact component={(data)=> {
            // console.log(data)
            return <MainPage user={this.state.user} changeFavoriteState={(state, movieId, userId)=> this.changeFavoriteState(state, movieId, userId)}
            isFavorite={(movieId)=> this.isFavorite(movieId)} isUserLoggedIn={this.state.isUserLoggedIn} movies={this.state.movies}/>
          }}/>
          <Route path="/movieInfo/:index" component={(data)=> {
            return <MovieInfo changeFavoriteState={(state, movieId, userId)=> this.changeFavoriteState(state, movieId, userId)} 
            isFavorite={(movieId)=> this.isFavorite(movieId)} match={data.match} 
            isUserLoggedIn={this.state.isUserLoggedIn} user={this.state.user} movies={this.state.movies}/>
          }}/>
          <Route path="/admin" component={(data)=> {
            return <Dashboard history={data.history} match={data.match} movies={this.state.movies} handleUpdate={(updatedMovie, movieData)=> this.handleUpdate(updatedMovie, movieData)}
            handleAdd={(addedMovie)=> this.handleAdd(addedMovie)}
            handleDelete={(deletedMovie, i)=> this.handleDelete(deletedMovie, i)} />
          }}/>
          <Route path="/user" exact component={() => {
            return <User isUserLoggedIn={this.state.isUserLoggedIn} user={this.state.user}/>
          }}/>
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
