import React from 'react';
import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'

class App extends React.Component{
  constructor() {
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <p>
              good luck guys.
            </p>
              Learn React
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
