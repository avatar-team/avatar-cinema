import '../App.css';
import React from 'react';
import { Row, Col } from 'reactstrap';
import SlideShow from './Slideshow';
import MovieCard from './MovieCard';
import Movietrailer from './Movietrailer.js';
import Daysbar from '../components/Tabs.js';

class MainPage extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      moviesforDay : []
    };
  };

  check(date){
    var array = []
    this.props.movies.map((movie, i)=>{
      const day  =  new Date(movie.playDate).getDate()
      if(day === date ){
        array.push({movie, i})
      }  
    }) 
    this.setState({
      moviesforDay : [...array] 
    },()=>{
      console.log(this.state.moviesforDay)
    })

   
  }
 
  
  render(){
    return (
      <div style={{backgroundColor: 'rgb(24, 24, 31)'}}>
      <SlideShow/>
      <Row>
        <Col md="8">
          <Daysbar pageShow={(date = new Date().getDate()) => {
            // console.log('tab clicked')
            // console.log(date)
             this.check(date)
          }}/>
          {this.state.moviesforDay.map((movie)=> {
            console.log(movie)
            return <MovieCard key={movie.i} movie={movie.movie} index={movie.i}/>
          })}
        </Col>
        <Col md="4">
            {this.state.moviesforDay.map((movie, i)=> {
              return <Movietrailer key={movie.i} movie={movie.movie} />
            })}
        </Col>
      </Row>
    </div>
    )
  } 
}

export default MainPage;