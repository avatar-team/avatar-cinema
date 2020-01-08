import React from 'react'
import { Slide } from 'react-slideshow-image';
import '../App.css';

const slideImages = [
  'https://cdn.suwalls.com/wallpapers/movies/batman-the-dark-knight-rises-14671-1920x1200.jpg',
  'http://cdn.wallpapername.com/1680x1050/20130113/horror%20dark%20movies%20screaming%20scream%20movie%201680x1050%20wallpaper_www.wallpapername.com_62.jpg',
  'https://cdn.suwalls.com/wallpapers/movies/dark-shadows-12934-1920x1200.jpg'
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

const d = {
  width: '100%'
}
  

const Slideshow = () => (
    <div style={d} className="slide-container">
    <Slide {...properties}>
      <div className="each-slide">
        <div className='images' style={{'backgroundImage': `url(${slideImages[0]})`}}>
        </div>
      </div>
      <div className="each-slide">
        <div className='images' style={{'backgroundImage': `url(${slideImages[1]})`}}>
        </div>
      </div>
      <div className="each-slide">
        <div className='images' style={{'backgroundImage': `url(${slideImages[2]})`}}>
        </div>
      </div>
    </Slide>
  </div>
)

export default Slideshow;