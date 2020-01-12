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
import { faSearch, faUser, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import {Redirect, Link} from 'react-router-dom'


const search = {
  borderRadius: '0 1.6rem 1.6rem 0',
  width: '450px',
  backgroundColor: 'rgb(24, 24, 31)',
  borderColor: 'transparent',
  padding: '18px',
  marginRight: '110px'
}

const items = {
  paddingRight: '45px',
  fontSize: '14pt',
  color: 'white'
}

const logout = {
  border: '2px solid #ca3e47',
  backgroundColor: 'transparent',
  color: '#ca3e47',
  padding: '10px 14px',
  borderRadius: '.4rem',
  marginRight: '22px'
}

const logo = {
  fontSize: '28pt',
  padding: '0 45px 0 25px',
  color: '#ca3e47'
}

const inputSearch = {
  borderBottom: '2px solid #ca3e47', 
  borderLeft: '0', 
  borderRight: '0', 
  borderTop: '0', 
  color: 'white',
  paddingLeft: '32px',
  fontSize: '16pt'
}

const searchIcon = {
  color: '#ca3e47',
  fontWeight: 'bold',
  marginRight: '-50px'
}

const userPro = {
  paddingRight: '45px',
  color: 'white'
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
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className='mt-1' tag={Link} style={items} to="/">Home</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>

            <InputGroup style={search}>
              <InputGroupAddon addonType="prepend"><Button  className='bg-transparent border-0 ' onClick={()=> {
                handleSearch(document.getElementById('search').value)
              }}><FontAwesomeIcon style={searchIcon} size='1.5x' icon={faSearch}/></Button></InputGroupAddon>
              <Input style={inputSearch} className='bg-transparent ' id="search" />
            </InputGroup>
            
            </NavbarText>
            {props.isUserLoggedIn?
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-auto">
                <NavLink tag={Link} style={userPro}  to="/user"><FontAwesomeIcon className='mt-2' size='2x' icon={faUserAlt}/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=> {
                  props.changeUserState(false, {})
                  localStorage.setItem('x-auth-token', '')
                }} tag={Link} style={logout}  className='mt-2' to="/"><FontAwesomeIcon icon={faSignOutAlt}/></NavLink>
              </NavItem>
            </Nav>
            :
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className='mt-1 mx-2' tag={Link} to="/signup"><button className='signup'>Signup</button></NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink className='mt-1 mr-4' tag={Link} to="/login"> <button className='login'>Login</button></NavLink>
              </NavItem>
              
            </Nav>}
          </Collapse>
        </Navbar>
    </div>
  );
}
export default Navbarz;