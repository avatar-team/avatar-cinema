import React, { Component } from 'react';
import MovieController from './MovieController'

const Dashboard = ({movies, handleAdd, handleUpdate, handleDelete})=>{
  return (
    <MovieController movies={movies} handleUpdate={(updatedMovie)=> handleUpdate(updatedMovie)}
    handleAdd={(addedMovie)=> handleAdd(addedMovie)}
    handleDelete={(deletedMovie)=> handleDelete(deletedMovie)}/>
  );
}


export default Dashboard;