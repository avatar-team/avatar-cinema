import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';

  
const div = {
    width: '900px',
    marginTop: '20px'
}

const MovieCard = ({movie, index}) => (

  <div className="m-3" style={div}>
        <Col>
          <Card>
            <Row className="no-gutters">
              <Col md="4">
                <CardImg src={movie.Poster}/>
              </Col>
              <Col  md="8">
                <CardBody>
                <CardTitle>{movie.Title}</CardTitle>imdbRating: {movie.imdbRating} <span>{data.imdbRating}</span>
                <CardSubtitle className="mt-2">{movie.Plot}</CardSubtitle>
                <CardSubtitle className="mt-2">Price: {movie.price}$</CardSubtitle>
                <CardSubtitle className="mt-2">Time: {movie.playDate.toLocaleTimeString()} </CardSubtitle>
                <Link to={`/movieInfo/${index}`}><Button className="mt-4">Movie Info</Button></Link>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
  </div>
)

export default MovieCard;