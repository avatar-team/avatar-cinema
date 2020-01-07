import React from 'react';
import { Table } from 'reactstrap';
import data from '../dummyData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

const transparent = {
  backgroundColor: 'transparent',
  borderColor: 'transparent'
}

const table = {
  borderCollapse: 'collapse',
  padding: '10px'
}

const td = {
  padding: '12px'
}

const MovieControll = (props) => {
  return (
    <Table style={table} dark className="w-75 text-center m-auto">
      <thead>
        <tr>
          <th>Movie Title</th>
          <th>Time</th>
          <th>Date</th>
          <th>Price</th>
          <th>Chairs</th>
          <th className="text-center"><Button color="light"><FontAwesomeIcon icon={faPlus}/>  Add Movie</Button></th>
        </tr>
      </thead>

      <tbody>
      {data.map(movie => {
        return (
            <tr>
              <th>{movie.Title}</th>
              <td>12:00AM</td>
              <td>5/Jan</td>

              <td>16$</td>  
              <td>12/10</td>
              <td className="text-right"><button style={transparent}><FontAwesomeIcon color='white' icon={faEdit}/></button></td>
              <td><button style={transparent}><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></td>
            </tr>
        )
      })}
      </tbody>
    </Table>
  );
}

export default MovieControll;