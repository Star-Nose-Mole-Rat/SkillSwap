import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDisplayName, addUser } from '../userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister= (e) => {
        e.preventDefault();

        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
          })
          .then(data => data.json())
          .then(data => console.log(data))
          .catch(err => { console.log('invalid fetch request', err)});
      


        // navigate('/search');
    }

    return (        
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col sm={8}>
            <div className="text-center">
                <h2>Welcome!</h2>
            </div>
            <Form onSubmit={handleRegister}>
              <Row className='align-items-center'>
                <Col sm={3}>
                  <FormGroup>
                    <Form.Label>Username:</Form.Label>
                  </FormGroup>
                </Col>
          <Col sm={8}>
            <FormGroup>
              <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row className='align-items-center'>
          <Col sm={3}>
            <FormGroup>
              <Form.Label>Password:</Form.Label>
            </FormGroup>
          </Col>
          <Col sm={8}>
            <FormGroup>
              <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
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


