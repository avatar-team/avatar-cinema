import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
const Daysbar = () => (
  <div>
    <Tabs className="w-25 border border-top-0 mx-auto text-center" defaultActiveKey="home">
      <Tab eventKey="home" title="5/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="profile" title="6/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="contact" title="7/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="Day" title="8/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="Day2" title="9/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="Day3" title="10/1">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="Day4" title="11/1">
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>
  </div>
)

export default Daysbar;