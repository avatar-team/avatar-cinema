import '../App.css';
import React from 'react'
import { NavLink, NavItem, Nav } from 'reactstrap';

const temp = {
  width: '1196px',
  margin: '30px 18px auto',
  padding: '10px 10px 0px 10px',
  color: 'white'
}

class Daysbar extends React.Component {
  constructor(props) {
    super(props)
  }
  
  endDate(day, kind = 'day') { 
    let currentDate = new Date()
    if(kind == 'day') return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + day).getDate()
    else return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + day).getMonth() + 1
  }

  componentDidMount() {
    this.props.pageShow(this.endDate(0))
  }

  render() {
    return(
      <Nav tabs style={temp} className="border">
        <NavItem className='tabItem mx-2'>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(0))}}>
            {this.endDate(0) + " / " + this.endDate(0, 'month')}
          </NavLink>
        </NavItem>
        <NavItem className='tabItem mx-2'>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(1))}}>
            {this.endDate(1) + " / " + this.endDate(1, 'month')}
          </NavLink>
        </NavItem>
        <NavItem className='tabItem mx-2'>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(2))}}>
            {this.endDate(2) + " / " + this.endDate(2, 'month')}
          </NavLink>
        </NavItem>
        <NavItem className='tabItem mx-2'>
          <NavLink onClick={() => { this.props.pageShow(this.endDate(3)) }}>
            {this.endDate(3) + " / " + this.endDate(3, 'month')}
          </NavLink>
        </NavItem>

      </Nav> 
    ) 
  }
} 
      

export default Daysbar;