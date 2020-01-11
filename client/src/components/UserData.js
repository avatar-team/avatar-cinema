import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';

const UserData = ({movies})=> {
  let rows
  if(movies) {
    rows = movies.map((movie,i)=>{
      console.log(movie)
      return (<tr key={i} >
        <td>{movie.Title}</td>
        <td>{movie.price}</td>
        <td>{new Date(movie.playDate).toLocaleDateString()}</td>
        <td>{new Date(movie.playDate).toLocaleTimeString()}</td>
      </tr>)
    })
  }
  return (
    <tbody>
      {rows}
    </tbody>
  )
}

export default UserData