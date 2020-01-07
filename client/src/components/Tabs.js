import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const temp = {
  width: '868px',
  margin: '33px',
  padding: '10px 10px 0px 10px'
}

const Daysbar = () => (
  <div>
    <Tabs style={temp} className="border text-center" defaultActiveKey="home">
      <Tab eventKey="Day1" title="5/1"></Tab>
      <Tab eventKey="Day2" title="6/1"></Tab>
      <Tab eventKey="Day3" title="7/1"></Tab>
      <Tab eventKey="Day4" title="8/1"></Tab>
    </Tabs>
  </div>
)

export default Daysbar;