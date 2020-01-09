import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {useParams} from 'react-router-dom'

const div = {
    width: '710px'
}

const s = {
    textAlign: 'right'
}

const MovieInfo = ({movies, handleReservation, reservationInfo}) => {
  let { index } = useParams()
  let movie = movies[index];
  console.log(index, handleReservation)

  return(
    <div style={div}>
    {movie?
      <Row>
        <Col>
          <Card>
            <Row className="no-gutters">
              <Col md="8">
                <CardBody>
                    <CardTitle>{movie.Title}</CardTitle>
                    <CardSubtitle className="mt-3">{movie.Plot}</CardSubtitle>
                    <CardSubtitle className="mt-3">imdbRating: {movie.imdbRating}</CardSubtitle>
                    <CardSubtitle className="mt-3">Price: {movie.price}$</CardSubtitle>
                    <CardSubtitle className="mt-3">Runtime: {movie.Runtime} </CardSubtitle>
                    <CardSubtitle className="mt-3">available Chairs: {movie.availableChairs}/{movie.chairs} </CardSubtitle>
                    <CardSubtitle className="mt-3">Time: {new Date(movie.playDate).toLocaleTimeString()} </CardSubtitle>
                    <CardSubtitle className="mt-3">Date: {new Date(movie.playDate).toLocaleDateString()} </CardSubtitle>
                    <Button disabled={!movie.availableChairs? true: false} className="mt-4">Reserve Now!</Button>
                </CardBody>
              </Col>
              <Col md="4">
                <CardImg style={s}src={movie.Poster} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      :
      <div>this video is not available</div>
    }
    </div>
  )
}

export default MovieInfo;