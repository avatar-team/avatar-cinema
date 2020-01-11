import '../App.css'
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';
import UserData from './UserData'
import { Table } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom'
  
const table = {
  borderCollapse: 'collapse',
  padding: '10px',
  backgroundColor: '#313131'
}
  
const td = {
  padding: '12px'
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
            counter : 0
        }
      };

      render(){
          return(
            <div style={{color: 'white', backgroundColor: 'rgb(24, 24, 31)', marginTop: '50px'}}>
                {console.log(this.props)}
                <Container className="mb-3">
                    <Row>
                        <Col md="4">
                        <Card style={{backgroundColor: 'rgb(24, 24, 31)'}}>
                            <CardImg top width="100%" src='https://www.povertyalliance.org/wp-content/uploads/2019/03/Portrait_Placeholder.png' alt="Card image cap" />
                            <CardBody>
                                <CardTitle>User Name</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                             </CardBody>
                          </Card>
                        </Col>
                        <Col md="8">

                         <Nav>
                             <NavItem className='tabItem' >
                                 <NavLink activeClassName='tabItem' onClick={()=>this.setState({ counter:0 })}>
                                    Purchased moives
                                 </NavLink>   
                             </NavItem>
                             <NavItem className='tabItem' >
                                 <NavLink onClick={()=>this.setState({counter:1})}>
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
                             {( this.state.counter == 0)? <UserData movies={purchasedMoives} type={'P'} /> : null }
                             {( this.state.counter == 1)? <UserData movies={favoriteMoives} type={'F'}/> : null }
                         </Table>
                         
                        </Col>
                    </Row>
                </Container>
                
          </div>
             
          )
      }

}

export default User;

