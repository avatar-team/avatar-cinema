import React from 'react';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import '../App.css';
import { Row} from 'reactstrap';
import Movietrailer from './Movietrailer.js'

let cardsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
}
const MainPage = (props)=> {
  return(
    <div>
      <SlideShow/>
      <Row style={cardsContainer}>
        {props.movies.map((movie, i)=> {
          return <MovieCard key={i} movie={movie} index={i}/>
        })}
      </Row>
      <Row>
        <Movietrailer />
      </Row>
    </div>
  )
}

export default MainPage;