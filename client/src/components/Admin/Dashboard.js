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
    isAdminLoggedIn: true
  };
};

// componentDidMount() {
  
//   axios.get("/api/users").then(res =>{

//     this.setState({
//       users : [...res.data]

//     })} ).catch(err => console.log(err))
  
// }

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
          {this.state.isAdminLoggedIn?
            <Card id='card' style={{backgroundColor: 'rgb(24, 24, 31)', width: '1850px', margin: '0 auto', padding: '100px'}}>
              <Row>
                <Col md="2">
                  <div className='m-auto w-100'>

                    <h2 className='pb-2' style={{color: '#ca3e47', borderBottom: '2px solid white'}}>Controller</h2>
                    <button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} className='my-3' onClick={()=>this.setState({movieShow : false })}>Users</button><br></br>
                    <button style={{width: '240px', padding: '6px', fontSize: '13pt', borderColor: 'transparent', color: 'white' ,backgroundColor: '#ca3e47'}} onClick={()=>this.setState({movieShow : true })}>Movies</button>

                  </div>
                </Col>
                <Col md="10" style={{}}>
                  <div>
                  { this.state.movieShow ? <MovieController  movies={this.props.movies} handleUpdate={(updatedMovie, movieData)=> this.props.handleUpdate(updatedMovie, movieData)}
                    handleAdd={(addedMovie)=> this.props.handleAdd(addedMovie)}
                    handleDelete={(deletedMovie)=> this.props.handleDelete(deletedMovie)}/> : <UserController users={userData}/>
                  }
                  </div>
                </Col>
              </Row>
            </Card>
          :
          <Redirect to={`${this.props.match.url}/login`} />}
          </div>
        }}/>

        <Route path={`${this.props.match.path}/login`} component={(data)=> {
          return <AdminLogin changeAdminState={(state)=> this.changeAdminState(state)} history={data.history}/>
        }}/>

      </Switch>
    </BrowserRouter>
  )
}

}


export default Dashboard;


const userData = [{
  userName :"weeeha",
  firstName :"moahemd",
  lastName : "fared",
  userEmail:"weeehbla@gmail.com"
},
{
  userName :"weasdeeha",
  firstName :"moahemd",
  lastName : "salah",
  userEmail:"weeeasdhbla@gmail.com"
},
{
  userName :"asd",
  firstName :"ah,ed",
  lastName : "fared",
  userEmail:"weeasdehbla@gmail.com"
}
]