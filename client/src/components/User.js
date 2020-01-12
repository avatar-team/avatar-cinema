import React from 'react';
import { Nav, NavItem, NavLink, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import UserData from './UserData'
import { Table } from 'reactstrap';

import { Redirect } from 'react-router-dom';


  
const table = {
  borderCollapse: 'collapse',
  padding: '10px',
  backgroundColor: '#313131'
}
  
const td = {
  padding: '12px'
}

const subtitles = {
    margin: '10px',
    fontSize: '14pt',
    textAlign: 'left'
}

const purchasedMoives = [ {
  movie : "joker",
  price: 12,
  time : "SDfsdf",
  date : "SDfsdf"
}]

const favoriteMoives = [{
  movie : "x-men",
  price: 213,
  time : "SDf",
  date : "DSF"
}]


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPurched : true
        }
      };

      render(){
          return(
            <div style={{color: 'white', backgroundColor: 'rgb(24, 24, 31)', marginTop: '50px'}}>
                {console.log(this.props)}

                {!this.props.isUserLoggedIn? <Redirect to="/"/>:''}
                <Container className="mb-3">
                    <Row>
                        <Col md="4">
                        <Card style={{backgroundColor: 'rgb(24, 24, 31)'}}>
                            <CardImg top width="100%" src='https://www.povertyalliance.org/wp-content/uploads/2019/03/Portrait_Placeholder.png' 
                            alt="Card image cap" />
                            <CardBody>
                                <CardSubtitle className='mt-2' ><span style={subtitles}>Name: </span> {this.props.user.firstName + " " + this.props.user.lastName}</CardSubtitle>
                                <CardSubtitle className='mt-2' ><span style={subtitles}>Username: </span> {this.props.user.userName}</CardSubtitle>
                                <CardSubtitle className='mt-2' ><span style={subtitles}>Email: </span> {this.props.user.userEmail}</CardSubtitle>
                             </CardBody>
                          </Card>
                        </Col>
                        <Col md="8">

                         <Nav>
                             <NavItem className='tabItem' >
                                 <NavLink activeClassName='tabItem' onClick={()=>this.setState({showPurched: true})}>
                                    Purchased moives
                                 </NavLink>   
                             </NavItem>
                             <NavItem className='tabItem' >
                                 <NavLink onClick={()=>this.setState({showPurched: false})}>
                                    Favorite moives
                                 </NavLink>
                             </NavItem>
                         </Nav>
                         <Table style={table}  dark className="w-100 text-center m-auto">
                             <tr>
                                 <th>Movie Name</th>
                                 <th>Price</th>
                                 <th>Date</th>
                                 <th>Time</th>
                             </tr>
                             {this.state.showPurched? <UserData movies={this.props.user.moviesBought}/> : <UserData movies={this.props.user.favoriteMovies}/> }
                         </Table>
                         
                        </Col>
                    </Row>
                </Container>
                
          </div>
             
          )
      }

}

export default User;

