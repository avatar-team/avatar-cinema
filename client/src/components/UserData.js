import React from 'react';

/**
 * @function UserData function accept array of objects iterate over it,
 * and save the data inside table row
 * @param {*} movies Array of object
 * @returns return a table body contains the rows from the params
 */

const UserData = ({movies})=> {
  let rows
  if(movies) {
    rows = movies.map((movie,i)=>{
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