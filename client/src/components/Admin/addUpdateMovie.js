import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddUpdateMovie extends Component {

  constructor(props) {
    // {movie, handleAdd, handleUpdate, processType}
    super(props)
  }
    
  handleSubmit = (movieId) => {
    let result = {}
    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let chairs = document.getElementById('chairs')
    let date = document.getElementById('date')
    let time = document.getElementById('time')
    result.price = price.value;
    result.chairs = chairs.value;
    result.playDate = new Date(date.value + "  " + time.value);
    result.availability = true;
    if(this.props.processType == 'add') {
      result.Title = title.value;
      result.availableChairs = chairs.value
      this.props.handleAdd(result)
    } else this.props.handleUpdate(movieId, result)
  }
  
  render() {
    let isUpdate = this.props.processType == 'update'? true: false;
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        {console.log(this.props.movie)}
        <Form>
          <FormGroup>
            <Label>Movie Title: {isUpdate? this.props.movie.Title: ''}</Label>
            <Input disabled={isUpdate} id="title" name="Title" />
            <Label>Price: </Label>
            <Input id="price" name="price" type="number"/>
            <Label>Chairs: </Label>
            <Input id="chairs" name="chairs" type="number"/>
            <Label>Date: </Label>
            <Input id="date" name="date" type="date"/>
            <Label>Time: </Label>
            <Input id="time" name="time" type="time"/>
            <Button onClick={()=> this.handleSubmit(this.props.movie._id)}>{this.props.processType}</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
} 

export default AddUpdateMovie;