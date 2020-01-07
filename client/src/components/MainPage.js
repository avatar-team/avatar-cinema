import React from 'react';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import '../App.css';
import { Row} from 'reactstrap';


const MainPage = (props)=> {
  return(
    <div>
      <SlideShow/>
        {props.movies.map((movie, i)=> {
          return <MovieCard key={i} movie={movie} index={i}/>
        })}
    </div>
  )
}

export default MainPage;