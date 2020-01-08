import React from 'react'
import { Slide } from 'react-slideshow-image';
import '../App.css';

const slideImages = [
    'https://i.pinimg.com/originals/2f/55/fb/2f55fbc8f9cafd314115e7e58136e274.jpg',
    'https://i.ytimg.com/vi/selq7kFhGWE/maxresdefault.jpg',
    'https://www.movienewsletters.net/media/slider/1200x444/275172.jpg',
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