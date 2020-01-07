import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieCard from './components/MovieCard.js'
import MovieInfo from './components/MovieInfo.js'
import Navbar from './components/Navbar.js'
import Slideshow from './components/Slideshow.js';
import Tabs from './components/Tabs.js';
import Admin from './components/Admin.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Admin />, document.getElementById('root'));
