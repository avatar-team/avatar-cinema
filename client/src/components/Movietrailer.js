import React from 'react'


const temp2 = {
  margin: '32px'
}

const Movietrailer = (props) => (
  <div className="text-left" style={temp2}>
  
    <iframe 
    width="580" 
    height="260" 
    src={props.movie.movieTrailer}
    frameBorder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
    </iframe>      
  
  </div>
)

export default Movietrailer;