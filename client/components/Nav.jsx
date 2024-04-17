import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';


const Nav = () => {
    const navigate = useNavigate();

    const redirectToProfile = (e) => {
        e.preventDefault();
        navigate('/profile');
      };

      const handleLogout = (e) => {
        e.preventDefault();
        navigate('/');
      }

    return (
        <div>
            <Navbar expand='lg' className='bg-body-tertiary'>
              <Container className='m-0'>
                <div className='d-flex justify-content-start align-items-center'>
                <Navbar.Brand href='/search' className='ml-0'>Skill Swap</Navbar.Brand>
                <Button id='nav_profile' variant='info' onClick={redirectToProfile}>Profile</Button>
                </div>
                <div className='d-flex justify-content-end align-items-center m-0'>
                  <Button id='nav_logout' variant='light' onClick={handleLogout}>Logout</Button>
                </div>
              </Container>
            </Navbar>
        </div>
    )
}

export default Nav;