import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
  
const div = {
    width: '590px',
}

const MovieCard = () => (
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
              <CardTitle>{data.Title}</CardTitle>imdbRating: <span>{data.imdbRating}</span>
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
)

export default MovieCard;