import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import data from '../dummyData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import AddUpdateMovie from './addUpdateMovie'

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

const MovieControll = ({movies, handleAdd, handleUpdate, handleDelete}) => {

  let [check, setCheck] = useState(false)
  let [precessType, setType] = useState('')
  
  return (
    <div>

      <Table style={table} dark className="w-75 text-center m-auto">
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Time</th>
            <th>Date</th>
            <th>Price</th>
            <th>Chairs</th>
            <th className="text-center"><Button onClick={()=> {
              setType('add')
              setCheck(true)
            }} color="light"> <FontAwesomeIcon icon={faPlus}/>  Add Movie</Button></th>
          </tr>
        </thead>

        <tbody>
        {data.map((movie, i) => {
          return (
              <tr key={i}>
                <th>{movie.Title}</th>
                <td>12:00AM</td>
                <td>5/Jan</td>

                <td>16$</td>  
                <td>12/10</td>
                <td className="text-right"><button onClick={()=> {
                  setType('update')
                  setCheck(true)
                }} style={transparent}><FontAwesomeIcon color='white' icon={faEdit}/></button></td>
                <td><button style={transparent}><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></td>
              </tr>
          )
        })}
        </tbody>
      </Table>
      {check? <AddUpdateMovie processType={precessType} 
      movies={movies} handleUpdate={(updatedMovie)=> handleUpdate(updatedMovie)}
      handleAdd={(addedMovie)=> handleAdd(addedMovie)} />: ''}
    </div>
  );
}

export default MovieControll;