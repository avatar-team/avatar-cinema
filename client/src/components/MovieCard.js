import '../App.css'
import React, {useState} from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
  

const MovieCard = ({isFavorite, changeFavoriteState, user, movie, index}) => {
  let [favorite, setFavorite] = useState(isFavorite(movie._id));
  console.log(favorite)
  let handleFavorite = ()=> {

    changeFavoriteState(favorite? 'delete': 'add', movie._id, user._id )
    setFavorite(!favorite)
  }
  return (
    <div className="m-3 w-50">
        {console.log(movie)}
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
                  <CardSubtitle className="sub"> <span className='spans'> Plot: </span> {movie.Plot}</CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Genre: </span> {movie.Genre}</CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Price: </span> {movie.price}$</CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Time: </span> 08:00 </CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Date: </span> {movie.playDate} </CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Runtime: </span> {movie.Runtime} </CardSubtitle>
                  <CardSubtitle className="sub"> <span className='spans'> Available Chairs: </span> {movie.availableChairs} </CardSubtitle>

                  <Link to={`/movieInfo/${index}`}><button className="mt-5 cardBtn text-white">Movie Info</button></Link>
                  <Button style={{color: favorite ? user._id == undefined ? alert('Login') : 'red' : 'white'}} className='mx-5 bg-transparent border-0' onClick={()=> handleFavorite()}><FontAwesomeIcon size='2x' icon={faHeart}/></Button>
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