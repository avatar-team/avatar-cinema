import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  NavbarText
} from 'reactstrap';
import {  } from 'react-bootstrap'

const search = {
  borderRadius: '1.6rem 1.6rem 1.6rem 1.6rem',
  borderColor: 'transparent',
  padding: '18px',
  width: '300px'
}

const items = {
    paddingRight: '20px'
}

const bar = {
  backgroundColor: 'transparent'
}

const Navbarz = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{backgroundColor: 'rgb(24, 24, 31)'}}>
        <Navbar expand="md">
          <NavbarBrand href="/" style={items}>Avatar</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink style={items} href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={items} href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
                <Input style={search} placeholder="Search..." />
            </NavbarText>
          </Collapse>
        </Navbar>
    </div>
  );
}
export default Navbarz;
{/* <input style={search} type="text" placeholder="Search..." /> */}
