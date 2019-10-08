import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import {countries} from 'country-data';
// import Search from './search';
import db from './db.json';

const data = JSON.stringify(db);
const obj = JSON.parse(data);
//   Features
// Build a simple Javascript application that consumes the attached JSON data.
// You can find it here: https://bit.ly/2WoXetw
// List Tournament View
// Filter the list by Series, start and end dates
// Detail Tournament View:
// Display Tournament and Series details

class Data extends React.Component {

  // const [showText, setShowText] = useState(false);
  onchange = e => {
    this.setState({ search: e.target.value });
  };

  state = {
    search: ""
  };


  render() {
    const { search } = this.state;
    const filteredSeries = obj.filter(o => {
      return o.series.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    

      return (
        <React.Fragment>
          <Container fluid="true" className="bg-dark">
            <div className="text-light text-left container">
              <label htmlFor="series" className=" py-4 mr-4">Search by Series! </label>
              <input
                id="series"
                label="Search Country"
                onChange={this.onchange}
              />          
            </div>
          </Container>

          <Container  className="text-left align-middle mt-4 font-weight-bold">
            <Row className="mb-3 ">
                <Col xs="12" sm="2">Name of League</Col>
                <Col xs="12" sm="3">Country and City</Col>
                <Col xs="12" sm="2">Starting Date</Col>
                <Col xs="12" sm="2">Finishing Date</Col>
                <Col xs="12" sm="2">
                  {/* <button onClick={() => setShowText(!showText)}>
                  Show Series
                  </button> */}
                </Col>
            </Row>
          </Container>

          <Container  className="text-left align-middle mt-4">
              { filteredSeries.map(o =>  (  
                <React.Fragment>
                  <Row className="mt-4" key={o.id} >
                      <Col xs="12" sm="2">{o.name}</Col>
                      <Col xs="12" sm="3">{ countries[`${o.country}`].name }, {o.city}</Col>
                      <Col xs="12" sm="2">
                        <Moment >{o.date_start.replace(' ', 'T').substring(0, o.date_start.length-5)}</Moment>
                      </Col>
                      <Col xs="12" sm="2">
                        <Moment >{o.date_end.replace(' ', 'T').substring(0, o.date_end.length-5)}</Moment>
                      </Col>
                  </Row>
                  {/* {showText &&  */}
                    <Row key={o.series.id} className="bg-light secondary-color mt-2">
                      <Col xs="12" sm="2" className="my-auto">
                        {o.series.name} 
                      </Col>
                      <Col xs="12" sm="3"  className="my-auto" >- </Col>

                      <Col xs="12" sm="2">
                        <Moment >{o.series.date_start}</Moment>
                      </Col>
                      <Col xs="12" sm="2">
                        <Moment >{o.series.date_start}</Moment>
                      </Col>
                    </Row>
                  {/* } */}

                </React.Fragment>
              ))}
          </Container>
        </React.Fragment>
      )
    }
  };

export default Data;
