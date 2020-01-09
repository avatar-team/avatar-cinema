import React, { Component } from 'react';
import MovieController from './MovieController'
import {  Row, Col ,Container ,Button} from 'reactstrap';
import axios from 'axios';


class Dashboard extends React.Component {

constructor(props) {

  super(props)

  this.state = {
    users : [] 
  };
};

// componentDidMount() {
  
//   axios.get("/api/users").then(res =>{

//     this.setState({
//       users : [...res.data]

//     })} ).catch(err => console.log(err))
  
// }

render(){
  return(
    <Row>
        <Col md="2">
          <Button>user</Button>
         <br/>
          <Button>movie</Button>
        </Col>
        <Col md="10">
        <MovieController  movies={this.props.movies} handleUpdate={(updatedMovie, movieData)=> this.props.handleUpdate(updatedMovie, movieData)}
          handleAdd={(addedMovie)=> this.props.handleAdd(addedMovie)}
          handleDelete={(deletedMovie)=> this.props.handleDelete(deletedMovie)}/>
        </Col>
      </Row>
  )
}

}


export default Dashboard;