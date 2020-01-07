import React from 'react';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import '../App.css';
import { Row} from 'reactstrap';
import Movietrailer from './Movietrailer.js'


const MainPage = (props)=> {
  return(
    <div>
      <SlideShow/>
        {props.movies.map((movie, i)=> {
          return <MovieCard key={i} movie={movie} index={i}/>
        })}
      <Row>
        <Movietrailer />
      </Row>
    </div>
  )
}

export default MainPage;