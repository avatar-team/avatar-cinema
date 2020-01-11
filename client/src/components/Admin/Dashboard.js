import React, { Component } from 'react';
import MovieController from './MovieController'
import UserController from './UserConttroller'
import {  Row, Col ,Container , Button, Card, Table} from 'reactstrap';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom'
import AdminLogin from './adminLogin.js'


class Dashboard extends React.Component {

constructor(props) {

  super(props)

  this.state = {
    users : [] ,
    movieShow : true,
    isAdminLoggedIn: false
  };
};

bringUsersData() {
  let token = localStorage.getItem('admin-auth-token')
  console.log(token)
  axios.get("/api/admin", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(res =>{
    console.log(res)
    this.setState({
      users : [...res.data.users],
      isAdminLoggedIn: true
  
    },()=> console.log(this.state.isAdminLoggedIn))} )
    .catch(err => console.log(err))
}


componentDidMount() {
  this.bringUsersData()
}

changeAdminState(state) {
  this.setState({
    isAdminLoggedIn: state
  })
}

render(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={()=> {
          return <div>
            {console.log(this.state.isAdminLoggedIn)}
          {this.state.isAdminLoggedIn?
            <Card id='card' style={{backgroundColor: 'rgb(24, 24, 31)', width: '1850px', margin: '0 auto', padding: '100px'}}>
              <Row>
                <Col md="2" className="text-center">
                  <div className='m-auto w-100'>
                    <h2 className='pb-2 text-left' style={{color: '#ca3e47', borderBottom: '2px solid white'}}>Controller</h2>
                    <Button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} className='my-3' onClick={()=>this.setState({movieShow : false })}>Users</Button>
                    <Button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} onClick={()=>this.setState({movieShow : true })}>Movies</Button>  
                  </div>
                </Col>
                <Col md="10">
                  <div>
                    { this.state.movieShow ? <MovieController  movies={this.props.movies} handleUpdate={(updatedMovie, movieData)=> this.props.handleUpdate(updatedMovie, movieData)}
                    handleAdd={(addedMovie)=> this.props.handleAdd(addedMovie)}
                    handleDelete={(deletedMovie)=> this.props.handleDelete(deletedMovie)}/> : <UserController users={this.state.users}/>}
                  </div>
                </Col>
              </Row>
            </Card>:
          <Redirect to={`${this.props.match.url}/login`} />}
          </div>
        }}/>

        <Route path={`${this.props.match.path}/login`} component={(data)=> {
          return <AdminLogin isAdminLoggedIn={this.state.isAdminLoggedIn} changeAdminState={(state)=> this.changeAdminState(state)} history={data.history}/>
        }}/>

      </Switch>
    </BrowserRouter>
  )
}

}


export default Dashboard;

