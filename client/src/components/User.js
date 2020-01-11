
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';
import UserData from './UserData'
import { Table } from 'reactstrap';
import { Redirect } from 'react-router-dom';


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

  const purchasedMoives =[ {
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
        super(props)

        this.state = {
            counter : 0 
        }
      
      };

      render(){
          return(
             
            <div >
                {!this.props.isUserLoggedIn? <Redirect to="/"/>:''}
                <Container className="mb-3">
                    <Row>
                        <Col md="4" className="border border-primary">
                        <Card>
                             <CardImg top width="100%" src={data[0].Poster} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Name: {this.props.user.firstName + " " + this.props.user.lastName}</CardTitle>
                                <CardSubtitle>username: {this.props.user.userName}</CardSubtitle>
                                <CardText>email: {this.props.user.userEmail}</CardText>
                             </CardBody>
                          </Card>
                        </Col>
                        <Col md="8" className="border border-primary ">

                         <Nav tabs  className="border">
                             <NavItem>
                                 <NavLink  onClick={()=>{this.setState({counter:0})}}>
                                 purchased moives
                                 </NavLink>   
                             </NavItem>
                             <NavItem>
                                 <NavLink onClick={()=>{this.setState({counter:1})}}>
                                favorite moives
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
                             {( this.state.counter == 0)? <UserData movies={ purchasedMoives} /> : null }
                             {( this.state.counter == 1)? <UserData movies={ favoriteMoives} /> : null }
                         </Table>
                         
                        </Col>
                    </Row>
                </Container>
                
          </div>
             
          )
      }

}

export default User;

