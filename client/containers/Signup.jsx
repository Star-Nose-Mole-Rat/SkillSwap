import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDisplayName, addUser } from '../userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';

const Signup = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, displayName })
          })
          .then(data => {
            console.log(data);
            dispatch(addUser(username));
            dispatch(addDisplayName(displayName));
            navigate('/search');
            
          })
          .catch(err => { console.log('Error in Signup', err)});
          
    }

    return (        
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col sm={8}>
            <div className="text-center">
                <h2>Welcome!</h2>
            </div>
            <Form style={{ marginTop: '50px' }} onSubmit={handleRegister}>
              <Row className='align-items-center'>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Label>Username:</Form.Label>
                  </FormGroup>
                </Col>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className='align-items-center' style={{ marginTop: '10px' }}>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Label>Password:</Form.Label>
                  </FormGroup>
                </Col>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className='d-flex align-items-center' style={{ marginTop: '10px' }}>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Label>Display Name:</Form.Label>
                  </FormGroup>
                </Col>
                <Col sm={5}>
                  <FormGroup>
                    <Form.Control type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className='align-items-center justify-content-center mt-3'>
                <Button type='submit' variant='info' style={{ width: '100px' }}>Register</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    )
};

export default Signup;


