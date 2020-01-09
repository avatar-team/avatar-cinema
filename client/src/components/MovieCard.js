import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
  
const div = {
    width: '1200px',
    height: '1200px',
    marginTop: '20px'
}
const MovieCard = ({movie, index}) => (
  <div className="m-3" style={div}>
      {console.log(movie)}
      <Row>
      <Col>
        <Card>
          <Row>
            <Col md="5">
              <CardImg src={movie.Poster}/>
            </Col>
            <Col md="7">
              <CardBody className="cardBody">
                <CardTitle className="title">{movie.Title} <span className="imdb"> ... {movie.imdbRating} </span></CardTitle>
                <CardSubtitle className="my-4"> <span className='spans'> Plot: </span> {movie.Plot}</CardSubtitle>
                <CardSubtitle className="my-4"> <span className='spans'> Genre: </span> {movie.Genre}</CardSubtitle>
                <CardSubtitle className="mt-4"> <span className='spans'> Price: </span> {movie.price}$</CardSubtitle>
                <CardSubtitle className="mt-4"> <span className='spans'> Time: </span> 08:00 </CardSubtitle>
                <CardSubtitle className="mt-4"> <span className='spans'> Runtime: </span> {movie.Runtime} </CardSubtitle>
                <CardSubtitle className="mt-4"> <span className='spans'> Available Chairs: </span> {movie.chairs} </CardSubtitle>
                <Link to={`/movieInfo/${index}`}><button className="mt-5 cardBtn">Movie Info</button></Link>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
      </Row>
  </div>
)
export default MovieCard;