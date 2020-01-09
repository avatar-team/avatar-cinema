import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      <div style={{width: '50%', margin: 'auto'}}>
        {console.log(this.props.movie)}
        <Form>
          <FormGroup>
            <Label>Movie Title: {isUpdate? this.props.movie.Title: ''}</Label>
            <Input required disabled={isUpdate} id="title" name="Title" />
            <Label>Price: </Label>
            <Input required id="price" name="price" type="number"/>
            <Label>Chairs: </Label>
            <Input required id="chairs" name="chairs" type="number"/>
            <Label>Date: </Label>
            <Input required id="date" name="date" type="date"/>
            <Label>Time: </Label>
            <Input required id="time" name="time" type="time"/>
            <Button onClick={()=> this.handleSubmit(this.props.movie)}>{this.props.processType}</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
} 

export default AddUpdateMovie;