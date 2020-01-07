import React from 'react';
import { Table } from 'reactstrap';
import data from './dummyData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const transparent = {
  backgroundColor: 'transparent',
  borderColor: 'transparent'
}

const table = {
  borderCollapse: 'collapse'
}

const td = {
  padding: '0'
}

const Admin = (props) => {
  return (
    <Table style={table} dark className="w-75 text-left m-auto">
      <thead>
        <tr>
          <th>Movie Title</th>
          <th>Time</th>
          <th>Date</th>
          <th>Price</th>
          <th>Chairs</th>
        </tr>
      </thead>
      {data.map(movie => {
        return (
        <tbody>
            <tr>
              <th>{movie.Title}</th>
              <td>12:00AM</td>
              <td>5/Jan</td>
              <td>16$</td>
              <td>12/10</td>
              <td><button style={transparent}><FontAwesomeIcon color='white' icon={faEdit}/></button></td>
              <td><button style={transparent}><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></td>
            </tr>
        </tbody>
        )
      })}
    </Table>
  );
}

export default Admin;