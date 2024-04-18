import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import NavBar from '../components/Nav.jsx';

const SearchContainer = () => {
  const [search, setSearch] = useState('');

  const videos = useSelector(state => state.users.videos);


  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    console.log('searching for: ', search);
    fetch('/searchKeyword?searchword=' + search, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => { console.log('invalid fetch request', err)});
  }

    return (
        <div>
            <NavBar />
            <div className='d-flex justify-content-center' style={{ marginTop: '10px' }}>
              <input type='text' id='input_search' onChange={handleSearchChange} placeholder='Search...' style={{ marginRight: '10px' }}/>
                <Button onClick={handleSearch} className='btn btn-info'>Search</Button>
            </div>
            <div className='searchResults'>
              {/* recent added videos by users should be displayed */}
              {videos.map(video => <p>{video}</p>)}
            </div>
        </div>
    )
};

export default SearchContainer;