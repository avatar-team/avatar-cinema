import React from 'react'
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import data from './dummyData.js';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import { Row, Col, CardDeck, CardGroup, Container } from "reactstrap";
  

// const div = {
//     width: '40%',
//     height: '250px',
//     backgroundColor: 'grey',
//     textDicoration: 'none',
//     padding: '12px'
// }

// const image = {
//     height: '250px',
//     width: '200px',
//     float: 'right'
// }

// const bottomDiv = {
//     marginTop: '20px',
// }

// const span = {
//     marginBottom: '20px'
// }

const div = {
    width: '560px',
}



function MovieCard() {
    return (
        <Router>
            <Link to='/movieinfo'>
                <div style={div}>
                <Row>
                  <Col>
                    <Card>
                        <Row className="no-gutters">
                            <Col md="4">
                                <CardImg src={data.Poster}/>
                            </Col>
                            <Col  md="6">
                                <CardBody>
                                <CardTitle>{data.Title}</CardTitle> <CardSubtitle>{data.imdbRating}</CardSubtitle>
                                <CardSubtitle className="mt-2">{data.Plot}</CardSubtitle>
                                <CardSubtitle className="mt-2">Price: 16$</CardSubtitle>
                                <CardSubtitle className="mt-2">Time: 12:00AM</CardSubtitle>
                                <Button className="mt-4">Reserve Now!</Button>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
                </div>
            </Link>
        </Router>
    )
}

export default MovieCard;