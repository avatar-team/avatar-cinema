import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import data from '../dummyData.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardTitle } from 'reactstrap'
import AddUpdateMovie from './addUpdateMovie';
import Delete from './Delete.js'

const transparent = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  paddingRight: '8px',
  paddingLeft: '8px',
  textAlign: 'center'
}

const table = {
  borderCollapse: 'collapse',
  padding: '10px',
  backgroundColor: '#313131',
  width: '90%'
}


const MovieControll = ({movies, handleAdd, handleUpdate, handleDelete}) => {

  let [addUpdate, showAddUpdate] = useState(false)
  let [precessType, setType] = useState('')
  let [CurrentMovie, setMovie] = useState({});
  let [deleteComponent, showDelete] = useState(false);
  
  
  return (
    <div className='movieController'>

      <Table style={table} dark className="text-center m-auto">
        <thead>
          <tr>
            <th style={{fontSize: '14pt'}}>Movie Title</th>
            <th style={{fontSize: '14pt'}}>Time</th>
            <th style={{fontSize: '14pt'}}>Date</th>
            <th style={{fontSize: '14pt'}}>Price</th>
            <th style={{fontSize: '14pt'}}>Chairs</th>
            <th className="text-center">
              <label
              htmlFor="login-popup"
              style={{padding: '8px', borderColor: 'transparent', backgroundColor: '#ca3e47', color: 'white', borderRadius: '1rem'}}
              onClick={()=> {
              setType('add')
              showAddUpdate(true)
              showDelete(false)
              }} color="light"> <FontAwesomeIcon icon={faPlus}/>  Add Movie
              </label></th>
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
                <td className="text-center">
                <label
                htmlFor="login-popup"
                onClick={()=> {
                  movie.index = i
                  setType('update')
                  showAddUpdate(true)
                  setMovie(movie)
                  showDelete(false)
                }}
                style={transparent}>
                <FontAwesomeIcon color='white' icon={faEdit}/></label>

                <label 
                htmlFor="login-popup"
                onClick={()=> {
                  movie.index = i
                  setType('delete')
                  showAddUpdate(false)
                  showDelete(true)
                  setMovie(movie)
                }} style={transparent}><FontAwesomeIcon color='red' icon={faTrashAlt}/></label></td>
              </tr>
          )
        }):null}
        </tbody>
      </Table>
      {addUpdate? <AddUpdateMovie processType={precessType} 
      movie={CurrentMovie} handleUpdate={(updatedMovie, movieData)=> handleUpdate(updatedMovie, movieData)}
      handleAdd={(addedMovie)=> handleAdd(addedMovie)} />: ''}
      {deleteComponent? 
        <Delete  currentMovie={CurrentMovie.Title} showDelete={showDelete} handleDelete={(movieId, i)=> handleDelete(movieId, i)} index={CurrentMovie.index} id={CurrentMovie._id} />
      : ''}
    </div>
  );
}

export default MovieControll;