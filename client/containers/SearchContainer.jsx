import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { addVideo } from '../userSlice';

const SearchContainer = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const videos = useSelector(state => state.users.videos);

  // const handleAddVideo = (e) => {
  //   e.preventDefault();
  //   // dispatch(addVideo('Three phase power'))
  //   console.log(e.target.id);
  // }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    console.log('searching for: ', search);
    fetch('/search?searchword=' + search, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => { console.log('invalid fetch request', err)});
  }

  const redirectToProfile = (e) => {
    e.preventDefault();
    navigate('/profile');
  }

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/');
  }

    return (
        <div>
            <Navbar expand='lg' className='bg-body-tertiary'>
              <Container className='m-0'>
                <div className='d-flex justify-content-start align-items-center'>
                <Navbar.Brand href='./search' className='ml-0'>Skill Swap</Navbar.Brand>
                <Button id='nav_profile' variant='info' onClick={redirectToProfile}>Profile</Button>
                </div>
                <div className='d-flex justify-content-end align-items-center m-0'>
                  <Button id='nav_logout' variant='light' onClick={handleLogout}>Logout</Button>
                </div>
              </Container>
            </Navbar>
            <div className='d-flex justify-content-center'>
              <input type='text' id='input_search' onChange={handleSearchChange} placeholder='Search...' style={{ marginRight: '10px' }}/>
                <Button onClick={handleSearch} className='btn btn-info'>Search</Button>
            </div>
            <div className='searchResults'>
              {videos.map(video => <p>{video}</p>)}
            </div>
        </div>
    )
};

export default SearchContainer;