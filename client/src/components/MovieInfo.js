import React from 'react'
import data from './dummyData.js';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import {useParams} from 'react-router-dom'

const div = {
    width: '710px'
}

const s = {
    textAlign: 'right'
}

const MovieInfo = (props) => {
  let {id} = useParams()
  console.log(id)

  return(
    <div style={div}>
      <Row>
        <Col>
          <Card>
            <Row className="no-gutters">
              <Col md="8">
                <CardBody>
                    <CardTitle>{data.Title}</CardTitle>
                    <CardSubtitle className="mt-3">{data.Plot}</CardSubtitle>
                    <CardSubtitle className="mt-3">imdbRating: {data.imdbRating}</CardSubtitle>
                    <CardSubtitle className="mt-3">Price: 16$</CardSubtitle>
                    <CardSubtitle className="mt-3">Runtime: 120min</CardSubtitle>
                    <CardSubtitle className="mt-3">Time: 12:00AM</CardSubtitle>
                    <Button className="mt-4">Reserve Now!</Button>
                </CardBody>
              </Col>
              <Col md="4">
                <CardImg style={s}src={data.Poster} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MovieInfo;