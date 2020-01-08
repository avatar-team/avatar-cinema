import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { NavLink, NavItem, Nav } from 'reactstrap';


const temp = {
  width: '868px',
  margin: '33px',
  padding: '10px 10px 0px 10px'
}

class Daysbar extends React.Component {
  constructor() {
    super()
  }
  
  endDate(day, kind = 'day') { 
    let currentDate = new Date()
    if(kind == 'day') return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + day).getDate()
    else return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + day).getMonth() + 1
  }

  render() {
    return(
    <div>
      <Tabs style={temp} className="border text-center" defaultActiveKey="home">
        <NavLink onClick={()=> this.props.pageShow(this.endDate(0))} eventKey="Day1" title={this.endDate(0) + " / " + this.endDate(0, 'month')}></NavLink>
        <NavLink onClick={()=> this.props.pageShow(this.endDate(1))} eventKey="Day2" title={this.endDate(1) + " / " + this.endDate(1, 'month')}></NavLink>
        <NavLink onClick={()=> this.props.pageShow(this.endDate(2))} eventKey="Day3" title={this.endDate(2) + " / " + this.endDate(2, 'month')}></NavLink>
        <NavLink onClick={()=> this.props.pageShow(this.endDate(3))} eventKey="Day4" title={this.endDate(3) + " / " + this.endDate(3, 'month')}></NavLink>
      </Tabs>

    </div>
  ) 













      {/* <Nav tabs>
        <NavItem>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(0))}}>
            {this.endDate(0) + " / " + this.endDate(0, 'month')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(1))}}>
            {this.endDate(1) + " / " + this.endDate(1, 'month')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(2))}}>
            {this.endDate(2) + " / " + this.endDate(2, 'month')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(3)) }}>
            {this.endDate(3) + " / " + this.endDate(3, 'month')}
          </NavLink>
        </NavItem>
        
      </Nav> */}
      
  }
} 

export default Daysbar;