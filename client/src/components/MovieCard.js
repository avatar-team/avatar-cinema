import React, {useState} from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
  
// const div = {
//     width: '1200px',
//     height: '1200px',
//     marginTop: '20px'
// }

const MovieCard = ({isFavorite, changeFavoriteState, user, movie, index}) => {
  let [favorite, setFavorite] = useState(isFavorite(movie._id));
  return (
    <div className="m-3 w-50">
        {console.log(favorite)}
        <Row>
        <Col>
          <Card className='my-3' style={{width:"1200px", height:"563px", backgroundColor: 'rgb(24, 24, 31)', color: 'white'}}>
            <Row>
              <Col md="4">
                <CardImg src={movie.Poster}/>
              </Col>
              <Col md="8">
                <CardBody className="cardBody">
                  <CardTitle className="title">{movie.Title} <span className="imdb"> ... {movie.imdbRating} </span></CardTitle>
                  <CardSubtitle className="my-4"> <span className='spans'> Plot: </span> {movie.Plot}</CardSubtitle>
                  <CardSubtitle className="my-4"> <span className='spans'> Genre: </span> {movie.Genre}</CardSubtitle>
                  <CardSubtitle className="mt-4"> <span className='spans'> Price: </span> {movie.price}$</CardSubtitle>
                  <CardSubtitle className="mt-4"> <span className='spans'> Time: </span> 08:00 </CardSubtitle>
                  <CardSubtitle className="mt-4"> <span className='spans'> Runtime: </span> {movie.Runtime} </CardSubtitle>
                  <Button onClick={()=> {
                    changeFavoriteState(favorite? 'delete': 'add', movie._id, user._id )
                    setFavorite(!favorite)
                  }}>add to favorite</Button>
                  
                  <CardSubtitle className="mt-4"> <span className='spans'> Available Chairs: </span> {movie.availableChairs} </CardSubtitle>
                  <Link to={`/movieInfo/${index}`}><button className="mt-5 cardBtn">Movie Info</button></Link>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
        </Row>
    </div>
  )
}
export default MovieCard;