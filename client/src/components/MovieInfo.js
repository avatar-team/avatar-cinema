import React from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import Movietrailer from '../components/Movietrailer.js';
import Ticket from './Ticket.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
  

const div = {
  width: '1610px',
  backgroundColor: 'rgb(24, 24, 31)'
}

const cardInfo = {
  height:"563px",
  backgroundColor: 'rgb(24, 24, 31)',
  color: 'white',
  marginTop: '140px'
}

const cardImg = {
  height:"562px", 
  paddingRight: '20px',
  marginRight: '10px',
  width: '330px'
}

const trailerCol = {
  height:"563px",
  marginTop: '140px',
  backgroundColor: 'rgb(24, 24, 31)',
  color: 'white'
}

class MovieInfo extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      movie: this.props.movies[props.match.params.index],
      ticket: {},
      favorite: false,
      clicked: false
    }
  }
  collect() {
    let data = {
      firstName : this.props.user.firstName,
      lastName : this.props.user.lastName,
      userId : this.props.user._id,
      movieId : this.state.movie._id,
      playDate: this.state.movie.playDate,
      price: this.state.movie.price,
      title: this.state.movie.Title
    }
    this.handleReservation(data)
  }

  handleReservation(reservationData) {
    axios.post(`/api/user/reservation`, reservationData)
    .then((res)=> {
      if(res.data.status) {
        this.setState({
          ticket: res.data.reservation
        })
      }
    })
  }


  handleFavorite() {
    if(this.props.user._id == undefined) return alert('you need to sign in to use this feature')
    this.props.changeFavoriteState(this.state.favorite? 'delete': 'add', this.state.movie._id, this.props.user._id )
    this.setState({
      favorite: !this.state.favorite
    })
  }

  componentDidMount() {
    if(this.state.movie) {
      this.setState({
        favorite: this.props.isFavorite(this.state.movie._id)
      })
    }
  }

  render() {
    return(
      <div className='m-auto' style={div}>
      {this.state.movie?
        <Row>
          <Col md='7'>
            <Card style={cardInfo}>
              <Row className="no-gutters">
                <Col md='4'>
                  <CardImg style={cardImg} src={this.state.movie.Poster} />
                </Col>
                <Col md='8'>
                  <CardBody>
                      <CardTitle className="title">{this.state.movie.Title} <span className="imdb"> ... {this.state.movie.imdbRating} </span></CardTitle>
                      <CardSubtitle className="my-4"><span className='spans'>Plot: </span>{this.state.movie.Plot}</CardSubtitle>
                      <CardSubtitle className="my-4"> <span className='spans'>Price: </span>{this.state.movie.price}$</CardSubtitle>
                      <CardSubtitle className="my-4"> <span className='spans'>Runtime: </span>{this.state.movie.Runtime} </CardSubtitle>
                      <CardSubtitle className="my-4"> <span className='spans'>available Chairs: </span>{this.state.movie.availableChairs}/{this.state.movie.chairs} </CardSubtitle>
                      <CardSubtitle className="my-4"> <span className='spans'>Time: </span>{new Date(this.state.movie.playDate).toLocaleTimeString()} </CardSubtitle>
                      <CardSubtitle className="my-4"> <span className='spans'>Date: </span>{new Date(this.state.movie.playDate).toLocaleDateString()} </CardSubtitle>
                      
                      <label for="login-popup" onClick={()=> {
                        if ( !this.state.movie.availableChairs ) {
                          return alert('Sorry, No available Chairs on this Movie!');
                        }
                        this.collect()
                        this.setState({
                          clicked: true
                        })
                      }}
                      className="mt-5 cardBtn text-white" 
                      >
                      Reserve Now!</label>

                      <Button style={{color: this.state.favorite ? this.props.isUserLoggedIn ? 'red': alert('Login Mothafucker') : 'white'}} className='mx-4 mt-1 bg-transparent border-0' onClick={()=> this.handleFavorite()}><FontAwesomeIcon size='2x' icon={faHeart}/></Button>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md='5' className='w-75 p-5 text-center' style={trailerCol}>
            <h2 className='py-4'>Movie Trailer</h2>
            <Movietrailer movie={this.state.movie}/>
          </Col>
        </Row>
        :
        <div>this Movie is not available</div>
      }{this.state.clicked ? this.props.user._id == undefined ? alert('Login First Please') : <Ticket ticket={this.state.ticket}/> : ''}
      </div>
    )

  }
} 

export default MovieInfo;