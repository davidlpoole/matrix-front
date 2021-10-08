import React from 'react';
// import { List } from './features/people/List';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormDemo from './features/people/NewPersonForm';

function App() {

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <FormDemo/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
