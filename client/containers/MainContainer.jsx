import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';

const MainContainer = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/search');
  }  

    return (
      <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm={8}>
          <div className="text-center">
            <h2>SkiLL SwAP</h2>
          </div>
          
          <Form style={{ marginTop: '100px' }} onSubmit={handleLogin}>
            <Row className="align-items-center">
              <Col sm={3}>
                <FormGroup>
                  <Form.Label>Username:</Form.Label>
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  <Form.Control type='text' />
                </FormGroup>
              </Col>
            </Row>
            <Row className="align-items-center" style={{ marginTop: '10px' }}>
              <Col sm={3}>
                <FormGroup>
                  <Form.Label>Password:</Form.Label>
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  <Form.Control type='password' />
                </FormGroup>
              </Col>
              <Col sm={3} className='d-flex justify-content-end'>
                <Button type='submit' variant='info'>Login</Button>
              </Col>
            </Row>
          </Form>
          <div className="text-center mt-3">
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default MainContainer;