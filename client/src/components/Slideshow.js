import React from 'react'
import { Slide } from 'react-slideshow-image';
// import Carousel from 'react-bootstrap/Carousel'
import Carousel from 'react-bootstrap/Carousel'
import '../App.css';
import { format } from 'prettier';

const slideImages = [
  'https://www.hdwallpapers.in/download/bad_boys_for_life_will_smith_martin_lawrence_2020_5k-5120x2880.jpg',
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

const subDiv = {
  maxWitdh: '100%',
  width: '100%',
  height: '879px',
  maxHeight: '100%'
}

const images = {
  height: '100%',
  width: '100%'
}
  

const Slideshow = () => (
  <Carousel>

    <Carousel.Item>
      <div style={subDiv}>
        <img
          style={images}
          className=""
          src="https://www.hdwallpapers.in/download/jason_momoa_in_see_season_1_4k-3840x2160.jpg"
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div style={subDiv}>
        <img
          style={images}
          className=""
          src="https://www.hdwallpapers.in/download/underwater_2020_movie_4k-3840x2160.jpg"
          alt="Third slide"
        />
      <Carousel.Caption></Carousel.Caption>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div style={subDiv}>
        <img
          style={images}
          className=""
          src="https://www.hdwallpapers.in/download/joker_joaquin_phoenix_2019_4k_8k-7680x4320.jpg"
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </div>
    </Carousel.Item>

  </Carousel>
)

export default Slideshow;