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
  
    })} )
    .catch(err => {
      console.log(err)
      this.props.history.replace('/admin/login')
    })
}


componentDidMount() {
  this.bringUsersData()
}

changeAdminState(state) {
  this.setState({
    isAdminLoggedIn: state
  })
}

handleDelete(index) {
  console.log(index)
  this.setState(prevState=> {
    prevState.users.splice(index, 1)
    return {
      users: prevState.users
    }
  })
}

render(){
  return(
    <BrowserRouter>
    <div>
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={()=> {
          return <div>
            {console.log(this.state.isAdminLoggedIn)}
          {this.state.isAdminLoggedIn?
            <Card id='card' style={{backgroundColor: 'rgb(24, 24, 31)', width: '1850px', margin: '0 auto', padding: '100px'}}>
              <Row>
                <Col md="2" className="text-center">
                  <div className='m-auto w-100'>
                    <h2 className='pb-2 text-left' style={{color: '#ca3e47', borderBottom: '2px solid white'}}>Dashboard</h2>
                    <Button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} onClick={()=>this.setState({movieShow : true })}>Movies</Button>  
                    <Button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} className='my-3' 
                    onClick={()=> {
                      this.bringUsersData()
                      this.setState({movieShow : false })
                    }}>Users</Button>
                  </div>
                </Col>
                <Col md="10">
                  <div>
                    { this.state.movieShow ? <MovieController  movies={this.props.movies} handleUpdate={(updatedMovie, movieData)=> this.props.handleUpdate(updatedMovie, movieData)}
                    handleAdd={(addedMovie)=> this.props.handleAdd(addedMovie)}
                    handleDelete={(deletedMovie, i)=> this.props.handleDelete(deletedMovie, i)}/> : <UserController handleDelete={(i)=> this.handleDelete(i)} users={this.state.users}/>}
                  </div>
                </Col>
              </Row>
            </Card>:null}
          </div>
        }}/>

        <Route path={`${this.props.match.path}/login`} component={(data)=> {
          return <AdminLogin bringUsersData={()=> this.bringUsersData()} isAdminLoggedIn={this.state.isAdminLoggedIn} changeAdminState={(state)=> this.changeAdminState(state)} history={data.history}/>
        }}/>

      </Switch>
    </div>
    </BrowserRouter>
  )
}

}


export default Dashboard;

