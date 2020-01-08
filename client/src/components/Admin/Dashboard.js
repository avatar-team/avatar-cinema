import React, { Component } from 'react';
import MovieController from './MovieController'
import {  Row, Col ,Container ,Button} from 'reactstrap';

const Dashboard = ({movies, handleAdd, handleUpdate, handleDelete})=>{
  return (

      <Row>
        <Col md="2">
          <Button>user</Button>
         <br/>
          <Button>movie</Button>
        </Col>
        <Col md="10">
        <MovieController  movies={movies} handleUpdate={(updatedMovie, movieData)=> handleUpdate(updatedMovie, movieData)}
          handleAdd={(addedMovie)=> handleAdd(addedMovie)}
          handleDelete={(deletedMovie)=> handleDelete(deletedMovie)}/>
        </Col>
      </Row>
     
  );
}


export default Dashboard;