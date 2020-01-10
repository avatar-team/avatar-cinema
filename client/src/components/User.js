
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';
import PurchasedMovie from './purchasedMoive'
import { Table } from 'reactstrap';


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
                <Container className="mb-3">
                    <Row>
                        <Col md="4" className="border border-primary">
                        <Card>
                             <CardImg top width="100%" src={data[0].Poster} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>User title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
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
                             <NavItem>
                                <NavLink onClick={()=>{this.setState({counter:2})}}>
                                recommended movies
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
                         </Table>
                         
                         {( this.state.counter == 0)? <PurchasedMovie /> : null }
                         {( this.state.counter == 1)?  console.log(" favorite moives") : null }
                         {( this.state.counter == 2)? console.log("  recommended movies") : null }
                         
                        </Col>
                    </Row>
                </Container>
                
          </div>
             
          )
      }

}

export default User;

