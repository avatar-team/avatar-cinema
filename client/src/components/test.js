import React, { Component } from 'react';

class test extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={()=> {
        console.log(this.props.check())
      }}>
        hi hellow
      </div>
    );
  }
}

export default test;