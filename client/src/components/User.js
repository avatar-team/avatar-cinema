
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';



class User extends React.Component {
    constructor(props) {
        super(props)

        
      
      };

      render(){
          return(
             
            <div >
                <Container>
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
                        <Tabs   className="border border-primary rounded mt-3" >
                            <Tab title="purchased moive " ></Tab>
                            <Tab title="purchased moive "></Tab>
                            <Tab title="purchased moive "></Tab>   
                        </Tabs>
                        </Col>
                    </Row>
                </Container>
          </div>
             
          )
      }

}

export default User;

