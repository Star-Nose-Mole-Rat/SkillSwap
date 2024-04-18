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
          .then(res => {
            // Convert response to JSON to retrieve user data
            console.log(res);
            return res.json();
          })
          .then(data => {
            console.log(data);
            // If username not found, redirect to signup page
            if (data.status === 500) {
              alert("No user found! Please sign up.");
              navigate('/signup');
            }
            // If password for username is wrong, refresh the page
            else if (data.status === 504) {
              alert("Invalid credentials! Please try again.");
              window.location.reload();
            }
            // If login credentials are correct, redirect to search page
            else if (data.status === 200) {
              dispatch(addUser(username));
              console.log(data.userID);
              // Use userID to fetch profile info (displayname, points, videos)
              // dispatch(addVideos(data.videos));
              // dispatch(addPoints(data.points));
              navigate('/search');
            }
          })
          .catch(err => { 
            console.log('Error in Login', err);
          });
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