import React from 'react';


const UserData = ({movies})=> {
  let rows
  if(movies) {
    rows = movies.map((movie,i)=>{
      console.log(movie)
      return (<tr key={i} >
        <td>{movie.Title}</td>
        <td>{movie.price}</td>
        <td>{new Date(movie.playDate).toLocaleDateString()}</td>
        <td>{new Date(movie.playDate).toLocaleTimeString()}</td>
      </tr>)
    })
  }
  return (
    <tbody>
      {console.log(rows)}
      {rows}
    </tbody>
  )
}

export default UserData