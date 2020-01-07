import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Daysbar = () => (
  <div>
    <Tabs className="w-25 border border-top-0 mx-auto text-center" defaultActiveKey="home">
      <Tab eventKey="Day1" title="5/1"></Tab>
      <Tab eventKey="Day2" title="6/1"></Tab>
      <Tab eventKey="Day3" title="7/1"></Tab>
      <Tab eventKey="Day4" title="8/1"></Tab>
      <Tab eventKey="Day5" title="9/1"></Tab>
      <Tab eventKey="Day6" title="10/1"></Tab>
      <Tab eventKey="Day7" title="11/1"></Tab>
    </Tabs>
  </div>
)

export default Daysbar;