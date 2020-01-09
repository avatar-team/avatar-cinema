import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import data from '../dummyData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardTitle } from 'reactstrap'
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

  let [addUpdate, showAddUpdate] = useState(false)
  let [precessType, setType] = useState('')
  let [CurrentMovie, setMovie] = useState({});
  let [deleteComponent, showDelete] = useState(false);
  
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
              showAddUpdate(!addUpdate)
              showDelete(false)
            }} color="light"> <FontAwesomeIcon icon={faPlus}/>  Add Movie</Button></th>
          </tr>
        </thead>

        <tbody>
        {movies?movies.map((movie, i) => {
          return (
              <tr key={i}>
                <th>{movie.Title}</th>
                <td>{new Date(movie.playDate).toLocaleTimeString()} </td>
                <td>{new Date(movie.playDate).toLocaleDateString()}</td>

                <td>{movie.price}$</td>  
                <td>{movie.availableChairs} / {movie.chairs}</td>
                <td className="text-right"><button onClick={()=> {
                  setType('update')
                  showAddUpdate(!addUpdate)
                  setMovie(movie)
                  showDelete(false)
                }} style={transparent}><FontAwesomeIcon color='white' icon={faEdit}/></button></td>
                <td><button onClick={()=> {
                  setType('delete')
                  showAddUpdate(false)
                  showDelete(!deleteComponent)
                  setMovie(movie)
                }} style={transparent}><FontAwesomeIcon color='red' icon={faTrashAlt}/></button></td>
              </tr>
          )
        }):null}
        </tbody>
      </Table>
      {addUpdate? <AddUpdateMovie processType={precessType} 
      movie={CurrentMovie} handleUpdate={(updatedMovie, movieData)=> handleUpdate(updatedMovie, movieData)}
      handleAdd={(addedMovie)=> handleAdd(addedMovie)} />: ''}
      {deleteComponent?
          <Card style={{width: '50%', margin: 'auto'}} body inverse color="danger">
            <CardTitle>do you want to delete {CurrentMovie.Title} </CardTitle>
            <div style={{display: 'block-inline', margin: 'auto'}}>
              <Button onClick={()=> showDelete(false)} style={{margin: '10px'}}>Cancel</Button><Button onClick={()=> {
                handleDelete(CurrentMovie._id)
              }} color="secondary">Delete</Button>
            </div>
          </Card>
      : ''}
    </div>
  );
}

export default MovieControll;