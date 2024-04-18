import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addVideos, addPoints, addUser } from '../userSlice';

const MainContainer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
          })
          .then(data => {
            if (data.ok) {
            dispatch(addUser(username));
            // need to fetch user info(displayname, points, videos) based on the username

            // dispatch(addVideos(data.videos));
            // dispatch(addPoints(data.points));
            navigate('/search');
            }
          })
          .catch(err => { console.log('Error in Login', err)});
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
                  <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
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
                  <Form.Control type='password' onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
              </Col>
              <Col sm={3} className='d-flex justify-content-start'>
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