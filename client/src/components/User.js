// import React from 'react'
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import classnames from 'classnames';
import data from './dummyData.js';



class User extends React.Component {
    constructor(props) {
        super(props)
      
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


// const Example = (props) => {
//   const [activeTab, setActiveTab] = useState('1');

//   const toggle = tab => {
//     if(activeTab !== tab) setActiveTab(tab);
//   }

//   return (
//     <div>
//       <Nav tabs>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '1' })}
//             onClick={() => { toggle('1'); }}
//           >
//             Tab1
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '2' })}
//             onClick={() => { toggle('2'); }}
//           >
//             Moar Tabs
//           </NavLink>
//         </NavItem>
//       </Nav>
//       <TabContent activeTab={activeTab}>
//         <TabPane tabId="1">
//           <Row>
//             <Col sm="12">
//               <h4>Tab 1 Contents</h4>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="2">
//           <Row>
//             <Col sm="6">
//               <Card body>
//                 <CardTitle>Special Title Treatment</CardTitle>
//                 <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//                 <Button>Go somewhere</Button>
//               </Card>
//             </Col>
//             <Col sm="6">
//               <Card body>
//                 <CardTitle>Special Title Treatment</CardTitle>
//                 <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//                 <Button>Go somewhere</Button>
//               </Card>
//             </Col>
//           </Row>
//         </TabPane>
//       </TabContent>
//     </div>
//   );
// }

export default User;

