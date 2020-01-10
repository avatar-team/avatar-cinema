import '../App.css';
import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {useParams} from 'react-router-dom';
import Movietrailer from '../components/Movietrailer.js'

const div = {
  width: '1610px',
}

const MovieInfo = ({movies, handleReservation, reservationInfo}) => {
  let { index } = useParams()
  let movie = movies[index];
  console.log(index, handleReservation)

  return(
    <div className='m-auto' style={{backgroundColor: 'rgb(24, 24, 31)'}} style={div}>
    {movie?
      <Row>
        <Col md='7'>
          <Card className='mt-5' style={{height:"563px", backgroundColor: '#414141', color: 'white'}}>
            <Row className="no-gutters">
              <Col md='4'>
                <CardImg  style={{height:"563px"}} src={movie.Poster} />
              </Col>
              <Col md='8'>
                <CardBody>
                    <CardTitle className="title">{movie.Title} <span className="imdb"> ... {movie.imdbRating} </span></CardTitle>
                    <CardSubtitle className="my-4"><span className='spans'>Plot: </span>{movie.Plot}</CardSubtitle>
                    <CardSubtitle className="my-4"> <span className='spans'>Price: </span>{movie.price}$</CardSubtitle>
                    <CardSubtitle className="my-4"> <span className='spans'>Runtime: </span>{movie.Runtime} </CardSubtitle>
                    <CardSubtitle className="my-4"> <span className='spans'>available Chairs: </span>{movie.availableChairs}/{movie.chairs} </CardSubtitle>
                    <CardSubtitle className="my-4"> <span className='spans'>Time: </span>{new Date(movie.playDate).toLocaleTimeString()} </CardSubtitle>
                    <CardSubtitle className="my-4"> <span className='spans'>Date: </span>{new Date(movie.playDate).toLocaleDateString()} </CardSubtitle>
                    <button className="mt-3 cardBtn" disabled={!movie.availableChairs? true: false}>Reserve Now!</button>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md='5' className='w-75 mt-5 p-5 text-center' style={{height:"563px", backgroundColor: '#414141', color: 'white'}}>
          <h3>Movie Trailer</h3>
          <Movietrailer movie={movie}/>
        </Col>
      </Row>
      :
      <div>this video is not available</div>
    }
    </div>
  )
}

export default MovieInfo;