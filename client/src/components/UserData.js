import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText, Row, Col ,Card, CardImg,CardBody,
    CardTitle, CardSubtitle ,Container } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import data from './dummyData.js';

let header = '';
const UserData = ({movies, type})=>(
  <div>
 
   
    <tbody>
      {movies.map((movie,i)=>{
        return  <tr key={i} >
        <td>{movie.movie}</td>
        <td>{movie.price}</td>
        <td>{movie.date}</td>
        <td>{movie.time}</td>
        </tr>
      })}
    </tbody>
    </div>
)

export default UserData