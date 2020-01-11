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
import AdminLogin from './components/Admin/adminLogin';

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

  handleDelete(movieId, i) {
    console.log(i)
    axios.delete(`/api/movies/${movieId}`)
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
    console.log(state)
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
    //TODO you will receive a movie id, you should take the userId from the user state
    //and send the data to this route '/api/user/favorite save this film 
    console.log(state, movieId, userId)
      if(state == 'add') {
        axios.post('/api/user/favorite', {movieId: movieId, userId: userId})
        .then(res=> {
          this.getUser()
        })
        .catch(err => {
          console.log(err)
        })
      }else if(state == "delete") {
        axios.delete(`/api/user/favorite/${userId}/${movieId}`)
        .then(res=> {
          console.log(res)
        })
        .catch(err => {

        })
      }
  }
  

  getUser() {
    let token = localStorage.getItem('x-auth-token')
    axios.get('/api/user/',{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      console.log(res)
      if(res.data.status) {
        this.setState({
          user: res.data.user,
          isUserLoggedIn: true
        })
      }
    }).catch(err=> {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getUser()
    this.getMovies();
  }

  render() {
    let helper = videoTitle => this.handleSearch(videoTitle)
    return (
      <BrowserRouter>
        {console.log(this.state.user)}
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
            handleReservation={(reservationData)=> this.handleReservation(reservationData)} 
            isUserLoggedIn={this.state.isUserLoggedIn} user={this.state.user}
            handleReservation={(reservationData)=> this.handleReservation(reservationData)} movies={this.state.movies}/>
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
