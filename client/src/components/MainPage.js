import '../App.css';
import React from 'react';
import { Row, Col } from 'reactstrap';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import Movietrailer from './Movietrailer.js';
import Daysbar from '../components/Tabs.js'

const MainPage = (props)=> {
  return(
    <div>
      <SlideShow/>

      <Row>
        <Col md="8">
          <Daysbar />
          {props.movies.map((movie, i)=> {
            console.log(movie)
            return <MovieCard key={i} movie={movie} index={i}/>
          })}
        </Col>
        <Col md="4">
        {props.movies.map((movie, i)=> {
          console.log(movie)
          return <Movietrailer key={i} movie={movie} />
        })}
        </Col>
      </Row>
    </div>
  )
}

export default MainPage;