import React from 'react'


const temp2 = {
  marginRight: '100px',
  marginTop: '34px',
}

const Movietrailer = (props) => (
  <div style={temp2}>
  
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