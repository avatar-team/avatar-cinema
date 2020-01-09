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
  NavbarText,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const search = {
    borderRadius: '1.6rem 0 0 1.6rem',
    borderColor: 'transparent',
    padding: '18px'
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
    <div>
        <Navbar className="ddd" expand="md">
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
            <InputGroup style={search}>
              <InputGroupAddon addonType="prepend"><Button onClick={props.handleSearch}><FontAwesomeIcon icon={faSearch}/></Button></InputGroupAddon>
              <Input />
            </InputGroup>
            </NavbarText>
          </Collapse>
        </Navbar>
    </div>
  );
}
export default Navbarz;
{/* <input style={search} type="text" placeholder="Search..." /> */}
