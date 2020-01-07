import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';

  
const div = {
    width: '590px',
    marginTop: '20px'
}

const MovieCard = ({movie, index}) => (
  <div style={div}>
    <Col>
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
                <Link to={`/movieInfo/${index}`}><Button className="mt-4">Movie Info</Button></Link>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
  </div>
)

export default MovieCard;