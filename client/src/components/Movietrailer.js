import React from 'react'


const temp2 = {
  margin: '60px'
}

const Movietrailer = (props) => (
  <div className="m-4" style={temp2}>
  
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