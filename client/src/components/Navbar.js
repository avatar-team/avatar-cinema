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
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import {Redirect, Link} from 'react-router-dom'
import User from './User';

const search = {
  borderRadius: '0 1.6rem 1.6rem 0',
  width: '450px',
  backgroundColor: 'rgb(24, 24, 31)',
  borderColor: 'transparent',
  padding: '18px'
}

const items = {
  paddingRight: '45px',
  fontSize: '14pt',
  color: 'white'
}

const logo = {
  fontSize: '28pt',
  padding: '0 45px 0 25px',
  color: '#ca3e47'
  // fontFamily: 'Gill Sans Gill Sans MT Calibri Trebuchet MS sans-serif'
}



const Navbarz = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let [redirect, setRedirect] = useState(null);

  const toggle = () => setIsOpen(!isOpen);
  let handleSearch = (videoTitle) => {
    props.movies.map((movie, i)=> {
      if(movie.Title.toLowerCase().includes(videoTitle.toLowerCase())) {
        console.log(videoTitle);
        setRedirect("/movieInfo/" + i)
      }

    })
  }
  return (
    <div style={{backgroundColor: 'rgb(24, 24, 31)'}}>
      {redirect? <Redirect to={redirect}/>: ''}
        <Navbar expand="md">
          <NavbarBrand tag={Link} to="/" className='logo' style={logo}>Avatar</NavbarBrand>
          {/* <NavbarToggler onClick={toggle} /> */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className='mt-1' tag={Link} style={items} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='mt-1' style={items} href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
            <InputGroup style={search}>
              <InputGroupAddon addonType="prepend"><Button onClick={()=> {
                handleSearch(document.getElementById('search').value)
              }}><FontAwesomeIcon color='black' icon={faSearch}/></Button></InputGroupAddon>
              <Input id="search" />
            </InputGroup>
            </NavbarText>
            {props.isUserLoggedIn?
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={()=> {
                  props.changeUserState(false)
                  localStorage.setItem('x-auth-token', '')
                }} tag={Link} style={items} to="/">Log Out</NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink tag={Link} style={items} to="/user"><FontAwesomeIcon icon={faUser}/></NavLink>
              </NavItem>
            </Nav>
            :
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className='mt-1 mx-2' tag={Link} to="/signup"><Button color="primary">Signup</Button></NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink className='mt-1 mr-4' tag={Link} to="/login"> <Button outline color="primary">Login</Button></NavLink>
              </NavItem>
              
            </Nav>}
          </Collapse>
        </Navbar>
    </div>
  );
}
export default Navbarz;
{/* <input style={search} type="text" placeholder="Search..." /> */}
