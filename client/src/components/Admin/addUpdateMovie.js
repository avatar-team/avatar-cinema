import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { doc } from 'prettier';
import './Test2.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

class AddUpdateMovie extends Component {

  constructor(props) {
    // {movie, handleAdd, handleUpdate, processType}
    super(props)
  }
    
  handleSubmit = (movie) => {
    let result = {}
    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let chairs = document.getElementById('chairs')
    let date = document.getElementById('date')
    let time = document.getElementById('time')
    console.log(price.value.length, chairs.value.length, date.value.length)
    result.price = price.value.length > 0? price.value: movie.price;
    result.chairs = chairs.value.length > 0? chairs.value: movie.chairs;
    result.playDate = date.value.length > 0? new Date(date.value + "  " + time.value): new Date(movie.playDate);
    result.availability = true;
    if(this.props.processType == 'add') {
      result.Title = title.value;
      result.availableChairs = chairs.value
      this.props.handleAdd(result)
    } else {
      result.availableChairs = movie.availableChairs - (movie.chairs - result.chairs)
      this.props.handleUpdate(movie._id, result)
    }
  }
  
  render() {
    let isUpdate = this.props.processType == 'update'? true: false;
    return (
      <div class="popup-container">
        <input type="checkbox" id="login-popup" />
          <div class="popup">
              <label for="login-popup" class="transparent-label"></label>
                  <div class="popup-inner">
                      <div class="popup-title">
                          <h6>{isUpdate? "update Movie": 'Add Movie'}</h6>
                          <label style={{backgroundColor: 'transparent'}} for="login-popup" class="popup-close-btn"><FontAwesomeIcon color='red' size='2x' icon={faWindowClose}/></label>
                      </div>
                      <div class="popup-content">
                          <form>
                              <ul>
                                <li>
                                  <Label>Movie Title: {isUpdate? this.props.movie.Title: ''}</Label>
                                  <Input required disabled={isUpdate} id="title" name="Title" />
                                </li>
                                <li>
                                  <Label>Price: </Label>
                                  <Input required id="price" name="price" type="number"/>                                </li>
                                <li>
                                  <Label>Chairs: </Label>
                                  <Input required id="chairs" name="chairs" type="number"/>
                                </li>
                                <li>
                                  <Label>Date: </Label>
                                  <Input required id="date" name="date" type="date"/>
                                </li>
                                <li>
                                  <Label>Time: </Label>
                                  <Input required id="time" name="time" type="time"/>
                                </li>
                                <li>
                                  <Button style={{backgroundColor: '#ca3e47'}} className='mt-3' onClick={()=> this.handleSubmit(this.props.movie)}>Add Movie</Button>
                                </li>
                              </ul>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
} 

export default AddUpdateMovie;