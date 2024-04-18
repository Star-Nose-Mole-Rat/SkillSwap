import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addVideos, addPoints, addUser, addDisplayName } from '../userSlice';

const MainContainer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    if (response.ok) {
      const data = await response.json();
      console.log('profile data: ', data);
      console.log('profile.displayname', data.displayName);
      console.log('profile.videos', data.videos);
      console.log('profile.points', data.points);
      dispatch(addUser(username));
      // need to fetch user info(displayname, points, videos) based on the username
      dispatch(addDisplayName(data.displayName));
      dispatch(addVideos(data.videos));
      dispatch(addPoints(data.points));
      navigate('/search');
    } else {
      alert('Invalid Username or Password!');
      console.log('Invalid username or password');
      navigate('/');
      window.location.reload();
    }
  } catch (err) {
    console.log('Error in handleLogin', err)
  }
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