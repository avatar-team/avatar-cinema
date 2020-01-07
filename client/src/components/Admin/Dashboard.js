import React, { Component } from 'react';
import MovieController from './MovieController'

class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <MovieController/>
    );
  }
}

export default Dashboard;