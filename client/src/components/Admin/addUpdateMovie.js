import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
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

    
    if(date.value.length <= 0) {
      date.value = new Date(movie.playDate).toLocaleDateString()
    }else if(time.value.length < 0) {
      time.value = new Date(movie.playDate).toLocaleTimeString()
    }
    console.log(date.value, time.value)
    result.playDate = new Date(date.value + " " + time.value)
      
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
      <div className="popup-container">
        <input type="checkbox" id="login-popup" />
          <div className="popup">
              <label htmlFor="login-popup" className="transparent-label"></label>
                  <div className="popup-inner">
                      <div className="popup-title">
                          <h6>{isUpdate? "update Movie": 'Add Movie'}</h6>
                          <label style={{backgroundColor: 'transparent'}} htmlFor="login-popup" className="popup-close-btn"><FontAwesomeIcon color='red' size='2x' icon={faWindowClose}/></label>
                      </div>
                      <div className="popup-content">
                          <form onSubmit={()=> this.handleSubmit(this.props.movie)}>
                              <div>
                                <div>
                                  <Label>Movie Title: {isUpdate? this.props.movie.Title: ''}</Label>
                                  <Input disabled={isUpdate} id="title" name="Title" />
                                </div>
                                <div>
                                  <Label>Price: </Label>
                                  <Input id="price" name="price" type="number"/>                                
                                </div>
                                <div>
                                  <Label>Chairs: </Label>
                                  <Input id="chairs" name="chairs" type="number"/>
                                </div>
                                <div>
                                  <Label>Date: </Label>
                                  <Input required max="1-15-2020" min="1-11-2020" id="date" name="date" type="date"/>
                                </div>
                                <div>
                                  <Label>Time: </Label>
                                  <Input required id="time" name="time" type="time"/>
                                </div>
                                <div>
                                  <Button style={{backgroundColor: '#ca3e47'}} className='mt-3' >{isUpdate? "update Movie": 'Add Movie'}</Button>
                                </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
} 

export default AddUpdateMovie;