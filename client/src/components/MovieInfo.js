import '../App.css';
import React, {useState} from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import Movietrailer from '../components/Movietrailer.js';
import Ticket from './Ticket.js';
import axios from 'axios'

const div = {
  width: '1610px',
  backgroundColor: 'rgb(24, 24, 31)'
}

class MovieInfo extends React.Component {
  constructor(props){
    // ({movies, handleReservation, userData}) => {
    super(props)

    this.state = {
      movie: this.props.movies[props.match.params.index],
      ticket: {}
    }
  }
  collect() {
    console.log(this.props.userData)
    let data = {
      firstName : this.props.userData.firstName,
      lastName : this.props.userData.lastName,
      userId : this.props.userData._id,
      movieId : this.state.movie._id,
      playDate: this.state.movie.playDate,
      price: this.state.movie.price,
      title: this.state.movie.Title
    }
    console.log(data)
    this.handleReservation(data)
  }

  handleReservation(reservationData) {
    axios.post(`/api/user/reservation`, reservationData)
    .then((res)=> {
      if(res.data.status) {
        console.log(res.data.reservation)
        this.setState({
          ticket: res.data.reservation
        })
      }
    })
    // return {successs: true}
  }


  render() {
    return(
      <div className='m-auto' style={div}>
      {this.state.movie?
        <Row>
          <Col md='7'>
            <Card style={{height:"563px", backgroundColor: 'rgb(24, 24, 31)', color: 'white', marginTop: '140px'}}>
              <Row className="no-gutters">
                <Col md='4'>
                  <CardImg  style={{height:"562px", paddingRight: '10px'}} src={this.state.movie.Poster} />
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
                      <button onClick={()=>{this.collect()}} className="mt-4 cardBtn" disabled={!this.state.movie.availableChairs? true: false}>Reserve Now!</button>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md='5' className='w-75 p-5 text-center' style={{height:"563px", marginTop: '140px', backgroundColor: 'rgb(24, 24, 31)', color: 'white'}}>
            <h2 className='py-4'>Movie Trailer</h2>
            <Movietrailer movie={this.state.movie}/>
          </Col>
        </Row>
        :
        <div>this Movie is not available</div>
      }{this.state.ticket.price? <Ticket ticket={this.state.ticket}/>:''}
      </div>
    )

  }
} 

export default MovieInfo;